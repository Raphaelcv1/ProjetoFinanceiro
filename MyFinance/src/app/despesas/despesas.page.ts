import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.page.html',
  styleUrls: ['./despesas.page.scss'],
})
export class DespesasPage implements OnInit {
  listaLancamentos = [];

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async chamarFormularioD() {
    const modal = await this.modalController.create({
      component: FormComponent
    });
    return await modal.present();
  }

}
