import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  // Variables
  public lat: number;
  public lng: number;
  // CONSTANTES
  private PAGE_NAME = 'MapaPage';

  constructor(public navParams: NavParams, private viewCtrl: ViewController) {
    console.debug(`${this.PAGE_NAME}.constructor()`);
  }

  public ionViewDidLoad() {
    console.debug(`${this.PAGE_NAME}.ionViewDidLoad()`);
    console.log(`Geolocalización escaneada: ${this.navParams.get('coords')}`);

    // Ejemplo: Coordenadas de San Mames
    // this.lat = 43.264362;
    // this.lng = -2.949419;

    const geoData = this.navParams.get('coords').split(':'); // [0] = 'geo' | [1] = 'lat,lng'
    const coords = geoData[1].split(',');
    this.lat = Number(coords[0]);
    this.lng = Number(coords[1]);

    console.debug(`latitud ${this.lat} y longitud ${this.lng}`);
  }

  /** Cerrar ventana modal */
  public cerrarModal() {
    console.debug(`${this.PAGE_NAME}.cerrarModal()`);
    this.viewCtrl.dismiss();
  }
}
