import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  repetirLancamento = false;
  lancamento = Lancamentos;
  @Input() key: string;

  constructor(public modalController: ModalController, public lancamentoService: LancamentoService) { }

  ngOnInit() {
    if (this.key != undefined) {
      this.lancamentoService.buscarPorId(this.key).valueChanges().subscribe(res => {
        this.lancamento = res;
      })
    } else {
      this.lancamento = {
        key: '',
        descricao: '',
        valor: 0,
        tipo: 'recebido',
        categoria: 'Salário',
        dataLancamento: new Date(),
        quantidadeVezes: 0.
      }
    }
  }

}
