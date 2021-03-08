import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecebidosPageRoutingModule } from './recebidos-routing.module';

import { RecebidosPage } from './recebidos.page';
import { FormComponent } from './form/form.component';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecebidosPageRoutingModule,
    BrMaskerModule
  ],
  declarations: [RecebidosPage, FormComponent],
  entryComponents:[FormComponent]
})
export class RecebidosPageModule {}
