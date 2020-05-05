import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { PopoverComponent } from './components/popover/popover.component';
import { RegistrosComponent } from './components/registros/registros.component';
import { ModalPdfComponent } from './components/modal-pdf/modal-pdf.component';
import { ChooseRegisterComponent } from './components/choose-register/choose-register.component';

@NgModule({
  declarations: [AppComponent, PopoverComponent, RegistrosComponent, ModalPdfComponent, ChooseRegisterComponent],
  entryComponents: [PopoverComponent, RegistrosComponent, ModalPdfComponent, ChooseRegisterComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule],
  exports: [PopoverComponent, RegistrosComponent],
  providers: [
    StatusBar,
    BarcodeScanner,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
