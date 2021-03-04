import { LancamentosService } from './../../services/lancamentos.service';
import { Lancamentos } from './../../model/lancamentos';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  repetirLancamento = false;
  lancamento: Lancamentos;

  constructor(public modalCtrl: ModalController, public lancamentoService: LancamentosService) { }

  ngOnInit() { }

  salvarLancamento() {
    this.lancamentoService.criarLancamento(this.lancamento).then(res => {
      console.log(res);
    }).catch(error => console.log(error));
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
