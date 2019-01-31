import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
// Components
import { MyApp } from './app.component';
// Pages
import {
  HomePage,
  TabsPage,
  HistorialPage,
  MapaPage
} from '../pages/index.pages';
// Servicios | Providers
import { HistorialProvider } from "../providers/historial/historial";
import { UtilsProvider } from "../providers/utils/utils";
// Plugins de Cordova
import { BarcodeScanner } from '@ionic-native/barcode-scanner'; // Lector de códigos QR
import { InAppBrowser } from '@ionic-native/in-app-browser';    // Navegador embebido
import { Contacts } from '@ionic-native/contacts';              // Contactos de teléfono
import { EmailComposer } from '@ionic-native/email-composer';   // Emails
// AGM: Angular Google Maps
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    HistorialPage,
    MapaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      // TODO: Cambiar por el apiKey propio
      apiKey: 'AIzaSyA-HXVa2jtkGfKtIJwisxgC46RaWqC1xuI'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    HistorialPage,
    MapaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    HistorialProvider,
    UtilsProvider,
    InAppBrowser,
    Contacts,
    EmailComposer,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
