import { LancamentosService } from './../services/lancamentos.service';
import { Lancamentos } from './../model/lancamentos';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-recebidos',
  templateUrl: './recebidos.page.html',
  styleUrls: ['./recebidos.page.scss'],
})
export class RecebidosPage implements OnInit {
  listaLancamentos = [];

  constructor(public modalController: ModalController, public lancamentoService: LancamentosService) { }

  ngOnInit() {
    let lancamentos = this.lancamentoService.buscarTodos();
    lancamentos.snapshotChanges().subscribe(res => {
      this.listaLancamentos = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['key'] = item.key;
        this.listaLancamentos.push(a as Lancamentos);
      })
    })
  }

  async chamarFormularioR() {
    const modal = await this.modalController.create({
      component: FormComponent
    });
    return await modal.present();
  }

}
