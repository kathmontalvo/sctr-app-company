import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsurancePageRoutingModule } from './insurance-routing.module';
import { ComponentsModule } from '../../components/components.module';

import { InsurancePage } from './insurance.page';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsurancePageRoutingModule,
    ComponentsModule
  ],
  declarations: [InsurancePage],
  providers: [DocumentViewer]
})
export class InsurancePageModule {}
