import { Component } from '@angular/core';
// Cordova
import { BarcodeScanner } from '@ionic-native/barcode-scanner'; // Escaner de código QR
import { Platform } from 'ionic-angular';
// Providers
import { HistorialProvider } from './../../providers/historial/historial';
import { UtilsProvider } from './../../providers/utils/utils';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  // CONSTANTES
  private _CLASS_NAME = 'HomePage';
  // VARIABLES

  constructor(
    private barcodeScanner: BarcodeScanner,
    private platform: Platform,
    private historialService: HistorialProvider,
    private utilsProvider: UtilsProvider) {
    console.debug(`%c ${this._CLASS_NAME}.constructor()`);
  }

  /** Abre y escanea el código QR */
  public escanear() {
    console.debug(`%c ${this._CLASS_NAME}.escanear()`);

    /* --------------- PRUEBAS (NAVEGADOR DESKTOP) ------------------------ */
    if (!this.platform.is('cordova')) {
      console.debug('Mock data');
      // this.historialService.agregarHistorial('http://www.google.es');      // Dirección web (URL)
      // this.historialService.agregarHistorial('geo:43.264362,-2.949419');   // Geolocalozación
      // this.historialService.agregarHistorial('TEL:685773219');             // Número de teléfono
      /* this.historialService.agregarHistorial(`BEGIN:VCARD
VERSION:2.1
N:Stark;Tony
FN:Tony Stark
ORG:
TEL;HOME;VOICE:12345
TEL;TYPE=cell:67890
ADR;TYPE=work:;;;
EMAIL:tony@stark.com
END:VCARD` );                                                                 // Contacto (VCARD)

      return; */
      // this.historialService.agregarHistorial('MATMSG:TO:aingerusanchez72@gmail.com;SUB:Prueba ionic-qr-app;BODY:Email de prueba desde la app QR-Escaner;;');
    }
    /* ------------------------ FIN PRUEBAS ------------------------------- */

    // BarcodeScanner
    this.barcodeScanner.scan()
      .then(
        (barcodeData: any) => {
          if (barcodeData.cancelled) {
            console.log(`${this._CLASS_NAME}.escanear(): Escaner cancelado`);
            this.utilsProvider.mostrarToast('Escaner cancelado');
          } else {
            // this.utilsProvider.mostrarToast('Escaneando...');
            console.log(`Resultado: ${barcodeData.text}`);
            console.log(`Formato: ${barcodeData.format}`);
            console.log(`Cancelado?: ${barcodeData.cancelled}`);
            this.historialService.agregarHistorial(barcodeData.text);
          }
        },
      ).catch(
        (error: any) => {
          console.error(`${this._CLASS_NAME}.escanear(): Error al leer el código QR`);
          console.log(error);
          this.utilsProvider.mostrarToast(`Error: ${error.message}`);
        },
      );
  }

}
