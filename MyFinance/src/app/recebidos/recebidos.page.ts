import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormComponent } from './form/form.component';


@Component({
  selector: 'app-recebidos',
  templateUrl: './recebidos.page.html',
  styleUrls: ['./recebidos.page.scss'],
})
export class RecebidosPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async chamarFormulario() {
    const modal = await this.modalController.create({
      component: FormComponent
    });
    return await modal.present();
  }


}
