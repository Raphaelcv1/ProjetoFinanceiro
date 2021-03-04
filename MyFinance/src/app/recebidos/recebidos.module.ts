import { FormComponent } from './form/form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecebidosPageRoutingModule } from './recebidos-routing.module';

import { RecebidosPage } from './recebidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecebidosPageRoutingModule
  ],
  declarations: [RecebidosPage, FormComponent]
})
export class RecebidosPageModule {}
