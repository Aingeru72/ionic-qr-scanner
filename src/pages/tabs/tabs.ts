import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HistorialPage, HomePage } from '../index.pages';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  public tab1: any = HomePage;
  public tab2: any = HistorialPage;

  constructor() { }

}
