import { AdmobService } from './../services/admob.service';
import { LancamentosService } from './../services/lancamentos.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  saldoMes = 0;
  valorRecebido = 0;
  valorReceber = 0;
  valorAtrasadoReceber = 0;
  valorDespesa = 0;
  valorPagar = 0;
  valorAtrasadoPagar = 0;
  // numberMes = new Date().toISOString();
  mes = new Date().toISOString();

  constructor(public router: Router, public lancamentoService: LancamentosService,
    public modalCtrl: ModalController, private admobService: AdmobService) { }

  ngOnInit() {

    let lancamentos = this.lancamentoService.buscarTodos();
    lancamentos.snapshotChanges().subscribe(res => {
      this.saldoMes = 0;
      this.valorRecebido = 0;
      this.valorReceber = 0;
      this.valorAtrasadoReceber = 0;
      this.valorDespesa = 0;
      this.valorPagar = 0;
      this.valorAtrasadoPagar = 0;
      let mesAno = new Date(this.mes).getMonth().toString() + new Date(this.mes).getFullYear().toString();
      let dataHj = new Date();
      dataHj.setHours(0, 0, 0, 0);

      res.forEach(item => {
        let a = item.payload.toJSON();
        let datLanc = new Date(a['dataLancamento']).getMonth().toString() + new Date(a['dataLancamento']).getFullYear().toString();
        console.log("conparando");
        console.log(mesAno);
        console.log(datLanc);
        console.log(a['valor']);

        if (datLanc === mesAno) {

          if (a['tipo'] == 'recebido') {
            if (a['situacao'] == 1) {
              this.valorRecebido += parseFloat(a['valor']);
            } else {
              if (new Date(a['dataLancamento']).getTime() < dataHj.getTime()) {
                this.valorAtrasadoReceber += parseFloat(a['valor']);
              } else {
                this.valorReceber += parseFloat(a['valor']);
              }
            }
          } else {
            if (a['situacao'] == 1) {
              this.valorDespesa += parseFloat(a['valor']);
            } else {
              if (new Date(a['dataLancamento']).getTime() < dataHj.getTime()) {
                this.valorAtrasadoPagar += parseFloat(a['valor']);
              } else {
                this.valorPagar += parseFloat(a['valor']);
              }
            }
          }
        }
      })
      // this.saldoMes = (this.valorRecebido + this.valorReceber) - (this.valorDespesa + this.valorPagar);
      this.saldoMes = (this.valorRecebido) - (this.valorDespesa);
    })

    this.admobService.showBanner();

  }

  chamarRecebidos() {
    this.router.navigate(['recebidos']);
  }

  chamarDespesas() {
    this.router.navigate(['despesas']);
  }

  mudaMes() {
    this.ngOnInit();
  }

  // avancaMes() {
  //   if ((this.numberMes.getMonth() + 1) < 13) {
  //     this.numberMes += 1;
  //   }
  //   console.log(this.numberMes);
  // }

  // retornaMes() {
  //   if ((this.numberMes - 1) > 0) {
  //     this.numberMes.getMonth() -= 1;
  //   }
  //   console.log(this.numberMes);
  // }

}
