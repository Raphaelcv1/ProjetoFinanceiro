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
  mes = new Date().toISOString();

  constructor(public modalController: ModalController, public lancamentoService: LancamentosService) { }

  ngOnInit() {
    let lancamentos = this.lancamentoService.buscarTodos();
    let mesAno = new Date(this.mes).getMonth().toString() + new Date(this.mes).getFullYear().toString();

    lancamentos.snapshotChanges().subscribe(res => {
      this.listaLancamentos = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        let datLanc = new Date(a['dataLancamento']).getMonth().toString() + new Date(a['dataLancamento']).getFullYear().toString();
        if (datLanc == mesAno && a['tipo'] == "recebido") {
          a['key'] = item.key;
          this.listaLancamentos.push(a as Lancamentos);
        }
      })
    })
  }

  async alterarLancamentoR(key) {
    const modal = await this.modalController.create({
      component: FormComponent,
      componentProps: {
        'key': key
      }
    });
    return await modal.present();
  }

  async chamarFormularioR() {
    const modal = await this.modalController.create({
      component: FormComponent
    });
    return await modal.present();
  }

  mudaMes() {
    this.ngOnInit();
  }

}
