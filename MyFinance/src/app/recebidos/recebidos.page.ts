import { FormComponent } from './form/form.component';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { allowedNodeEnvironmentFlags } from 'process';

@Component({
  selector: 'app-recebidos',
  templateUrl: './recebidos.page.html',
  styleUrls: ['./recebidos.page.scss'],
})
export class RecebidosPage implements OnInit {
  listaLancamentos = [];

  constructor(public modalController: ModalController, public lancamentoService: LancamentoService) { }

  ngOnInit() {
    let lancamentos = this.lancamentoService.buscarTodos();
    lancamentos.snapshotChanges().subscribe(res => {
      this.listaLancamentos = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['key'] = item.key;
        this.listaLancamentos.push(a as Lancamentos);
      });
    })
  }

  async alterarLancamento(key) {
    const modal = await this.modalController.create({
      component: FormComponent,
      componentProps: {
        'key': key
      }
    });

  }

  async chamarFormulario() {
    const modal = await this.modalController.create({
      component: FormComponent
    });
    return await modal.present();
  }

}
