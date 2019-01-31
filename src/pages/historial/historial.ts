import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
// Providers
import { HistorialProvider } from './../../providers/historial/historial';
// Modelos
import { ScanData } from './../../models/scan-data.model';

@IonicPage()
@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {

  historial: ScanData[] = [];

  constructor(private historialProvider: HistorialProvider) {
  }

  ionViewDidLoad() {
    this.historial = this.historialProvider.cargarHistorial();
  }

  /**
   * Muestra el resultado seleccionado de la lista
   * @param index: índice de resultado del historial
   */
  mostrarResultado(index: number) {
    this.historialProvider.abrirEscaner(index);
  }

}
