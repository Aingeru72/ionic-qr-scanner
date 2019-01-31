import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class UtilsProvider {
  constructor(public toastCtrl: ToastController) {
    console.log('UtilsProvider.constructor()', this);
  }

  /**
   * Muestra un mensaje en pantalla (Toast) con el mensaje enviado
   * @param mensaje : texto a mostrar en el toast
   */
  public mostrarToast(mensaje: string) {
    this.toastCtrl
      .create({
        message: mensaje,
        duration: 3000,
        position: 'bottom',
      })
      .present();
  }

  /**
   * Parsea el VCard (Contacto) --> JSON
   * @param input (string) VCARD data
   */
  public parseVCard(input: string) {
    const Re1 = /^(version|fn|title|org):(.+)$/i;
    const Re2 = /^([^:;]+);([^:]+):(.+)$/;
    const ReKey = /item\d{1,2}\./;
    const fields = {};

    input.split(/\r\n|\r|\n/).forEach(line => {
      let results;
      let key;

      if (Re1.test(line)) {
        results = line.match(Re1);
        key = results[1].toLowerCase();
        fields[key] = results[2];
      } else if (Re2.test(line)) {
        results = line.match(Re2);
        key = results[1].replace(ReKey, '').toLowerCase();

        const meta = {};
        results[2]
          .split(';')
          .map((p, i) => {
            const match = p.match(/([a-z]+)=(.*)/i);
            if (match) {
              return [match[1], match[2]];
            }
            // tslint:disable-next-line:prefer-template
            return ['TYPE' + (i === 0 ? '' : i), p];
          })
          .forEach(p => {
            meta[p[0]] = p[1];
          });

        if (!fields[key]) fields[key] = [];

        fields[key].push({
          meta,
          value: results[3].split(';'),
        });
      }
    });

    return fields;
  }
}
