import { Injectable } from '@angular/core';
import {
  Contact,
  ContactField,
  ContactName,
  Contacts,
} from '@ionic-native/contacts'; // Contactos
import { EmailComposer } from '@ionic-native/email-composer';
// Cordova
import { InAppBrowser } from '@ionic-native/in-app-browser'; // Navegador embebido
import { ModalController, Platform, ToastController } from 'ionic-angular';
// Models
import { ScanData, TipoDato } from '../../models/scan-data.model';
// Pages
import { MapaPage } from '../../pages/mapa/mapa';
import { UtilsProvider } from '../../providers/utils/utils';

@Injectable()
export class HistorialProvider {
  private CLASS_NAME = 'HistorialProvider';
  private historial: ScanData[];

  constructor(
    private iab: InAppBrowser,
    private modalCtrl: ModalController,
    private platform: Platform,
    private contacts: Contacts,
    private utilsCrtl: UtilsProvider,
    private emailComposer: EmailComposer, // TODO: Implementar el EmailComposer (plugin) de Cordova
    public toastCtrl: ToastController,
  ) {
    console.log(`${this.CLASS_NAME}.constructor()`);
    // Inicializaciones
    this.historial = [];
  }

  /** Devuelve todo el historial */
  public cargarHistorial() {
    return this.historial;
  }

  /**
   * Devuelve los datos escaneados del código QR
   * @param scanData resultado del escaner
   */
  public agregarHistorial(scanData: string) {
    console.log(`${this.CLASS_NAME}.agregarHistorial()`);

    const data = new ScanData(scanData);
    this.historial.unshift(data);
    console.log(data);
    this.abrirEscaner(0);
  }

  /**
   * Lanza el resultado del escaner dependiedo del tipo:
   * web (http(s)), geolocalización, teléfono, SMS, VCard (contacto), email, evento, WiFi
   * @param index (Number) índice del resultado en el historial.
   * @see: https://ionicframework.com/docs/native/in-app-browser/
   */
  public abrirEscaner = (index: number) => {
    console.log(`${this.CLASS_NAME}.abrirEscaner(${index})`);

    const scanData = this.historial[index];

    switch (scanData.tipo) {
      case TipoDato.url:
        console.log('URL');
        // Abrir navegador embebido para mostrar dirección web
        // target == "_system" --> Abre el resultado en el navegador predeterminado del dispositivo.
        // target == null --> Abre el resultado en un navegador empotrado de la propia app.
        this.iab.create(scanData.data, '_system');
        break;
      case TipoDato.tel:
        console.log('Teléfono');
        // TODO: abrir app de llamadas del dispositivo
        // this.iab.create(scanData.data, "_system");
        console.error('Tipo no soportado');
        break;
      case TipoDato.geo:
        console.log('Geolocalización');
        // Abrir modal para mostrar geolocalización en el mapa
        this.modalCtrl.create(MapaPage, { coords: scanData.data }).present();
        break;
      case TipoDato.vcard:
        console.log('VCard - Contacto');
        // TODO: Abrir app de contactos con información escaneada
        // this.cargarContacto(scanData.data);
        break;
      case TipoDato.email:
        console.log('Email');
        // Ejemplo: MATMSG:TO:recepto@email.com;SUB:Asunto;BODY:Cuerpo del email;;
        this.parseToEmail(scanData.data);
        break;
      default:
        console.error('Tipo no soportado');
        break;
    }
  }

  /**
   * TODO: Carga una VCard de contacto telefónico
   * @param dataContacto datos de conectado VCARD
   */
  public cargarContacto = (dataContacto: string): void => {
    console.log(`${this.CLASS_NAME}.cargarContacto(${dataContacto})`);

    const datosContacto: any = this.utilsCrtl.parseVCard(dataContacto);

    console.log('Contacto: ');
    console.log(datosContacto);

    if (!this.platform.is('cordova')) {
      console.warn(
        `${this.CLASS_NAME}.cargarContacto() --> Dispositivo no compatible`,
      );
    } else {
      const contact: Contact = this.contacts.create();
      // contact.ContactName  = new ContactName(null, null, datosContacto.fn);
      // contact.ContactField = new ContactField('mobile', datosContacto.tel[0].value[0]);
      contact.name = new ContactName(undefined, 'Stark', 'Tony');
      contact.phoneNumbers = [new ContactField('mobile', '699999999')];
      contact.save().then(
        () => {
          console.log(
            `${this.CLASS_NAME}.cargarContacto(dataContacto): ${
            datosContacto.fn
            } creado`,
          );
          this.utilsCrtl.mostrarToast(
            `Nuevo contacto ${datosContacto.fn} creado`,
          );
        },
        (error: any) => {
          console.error(
            `${this.CLASS_NAME}.cargarContacto(dataContacto): ERROR: `,
          );
          console.error(error);
          this.utilsCrtl.mostrarToast(
            'Ha ocurrido un error al cargar el contacto',
          );
        },
      );
    }
  }

  /** Parsea la información del código QR escaneado en un HTML y lo abre en un navegador embebido */
  public parseToEmail = (scanEmail) => {
    console.log(`${this.CLASS_NAME}.parseToEmail()`);

    let htmlEmail = scanEmail;
    htmlEmail = htmlEmail.replace('MATMSG:TO:', 'mailto:'); // Parsea el receptor
    htmlEmail = htmlEmail.replace(';SUB:', '?subject=');    // Parsea el asunto
    htmlEmail = htmlEmail.replace(';BODY:', '&body=');      // Parsea el contenido
    htmlEmail = htmlEmail.replace(';;', '');                // Parsea el final del mensaje
    htmlEmail = htmlEmail.replace(/ /g, '%20');             // Parsea los whitespaces

    console.log(htmlEmail);

    // Abre el email en un navegador embebido en la app
    this.iab.create(htmlEmail, '_system');
  }
}
