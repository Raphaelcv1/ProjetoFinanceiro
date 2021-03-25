import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { Lancamentos } from '../model/lancamentos';
import { ExcelService } from '../services/excel.service';
import { LancamentosService } from '../services/lancamentos.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  d = new Date();
  mes = new Date().toISOString();
  mesAnterior = new Date(this.d.getFullYear(), this.d.getMonth(), this.d.getDate() - 30).toISOString();

  listaLancamentos = [];

  constructor(public lancamentoService: LancamentosService, private excelService: ExcelService) { }

  ngOnInit() {
    console.log("Teste>: " + this.mesAnterior);

  }

  export() {
    let lancamentos = this.lancamentoService.buscarTodos();

    lancamentos.snapshotChanges().subscribe(res => {
      this.listaLancamentos = [];
      const header = ['Categoria', 'Data', 'Descrição', 'Valor R$', 'Situação'];

      res.forEach(item => {
        let a = item.payload.toJSON();
        let b = [];
        let cp = "";

        if (new Date(a['dataLancamento']).getTime() >= new Date(this.mesAnterior).getTime() &&
          new Date(a['dataLancamento']).getTime() <= new Date(this.mes).getTime()) {

          a['key'] = item.key;
          if (a['tipo'] == "despesa") {
            a['valor'] = a['valor'] * -1;
          }
          if (a['situacao'] == 1) {
            cp = "PAGO";
          } else if (a['situacao'] != 1 && new Date(a['dataLancamento']).getTime() <= new Date().getTime()) {
            cp = "VENCIDO";
          }

          b = [a['categoria'], formatDate(a['dataLancamento'], 'dd/MM/yyyy', 'en-US'), a['descricao'], a['valor'], cp];
          console.log(b);

          this.listaLancamentos.push(b);
        }
      })
      console.log(this.listaLancamentos);
      this.excelService.generateExcel("Relatótio de Despesas e Recebimentos", header, this.listaLancamentos);
    })

  }

}
