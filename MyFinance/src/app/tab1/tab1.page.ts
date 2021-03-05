import { LancamentosService } from './../services/lancamentos.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  saldoMes = 0;
  valorRecebido = 0;
  valorReceber = 0;
  valorDespesa = 0;
  valorPagar = 0;

  constructor(public router: Router, public lancamentoService: LancamentosService) { }

  ngOnInit() {

    let lancamentos = this.lancamentoService.buscarTodos();
    lancamentos.snapshotChanges().subscribe(res => {
      this.saldoMes = 0;
      this.valorRecebido = 0;
      this.valorReceber = 0;
      this.valorDespesa = 0;
      this.valorPagar = 0;
      res.forEach(item => {
        let a = item.payload.toJSON();
        if (a['tipo'] == 'recebido') {
          if (a['situacao'] == 1) {
            this.valorRecebido += parseFloat(a['valor']);
          } else {
            this.valorReceber += parseFloat(a['valor']);
          }
        } else {
          if (a['situacao'] == 1) {
            this.valorDespesa += parseFloat(a['valor']);
          } else {
            this.valorPagar += parseFloat(a['valor']);
          }
        }
      })
      this.saldoMes = (this.valorRecebido + this.valorReceber) - (this.valorDespesa + this.valorPagar);
    })
  }

  chamarRecebidos() {
    this.router.navigate(['recebidos']);
  }

  chamarDespesas() {
    this.router.navigate(['despesas']);
  }

}
