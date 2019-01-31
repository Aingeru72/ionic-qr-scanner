import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
// Modelos
import { ScanData } from './../../models/scan-data.model';
// Providers
import { HistorialProvider } from './../../providers/historial/historial';

@IonicPage()
@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {

  public historial: ScanData[] = [];

  constructor(private historialProvider: HistorialProvider) {
  }

  public ionViewDidLoad() {
    this.historial = this.historialProvider.cargarHistorial();
  }

  /**
   * Muestra el resultado seleccionado de la lista
   * @param index: índice de resultado del historial
   */
  public mostrarResultado(index: number) {
    this.historialProvider.abrirEscaner(index);
  }

}
