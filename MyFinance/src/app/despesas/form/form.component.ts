import { LancamentosService } from './../../services/lancamentos.service';
import { Lancamentos } from './../../model/lancamentos';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  repetirLancamento = false;
  lancamento: Lancamentos;
  @Input() key: string;

  constructor(public modalCtrl: ModalController, public lancamentoService: LancamentosService, public alertController: AlertController) {
  }

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
        valorString: '00',
        tipo: 'despesa',
        categoria: 'Salário',
        dataLancamento: new Date().toISOString(),
        quantidadeVezes: 1,
        repetirLancamento: false,
        situacao: true
      }
    }
  }

  async excluirLancamento() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atenção!',
      message: 'Deseja Apagar esse registro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.dismiss();
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'OK',
          handler: () => {

            if (this.key != undefined) {
              this.lancamentoService.removerLancamento(this.key);
              this.dismiss();
            }
            // console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();

  }

  salvarLancamento() {
    if (this.key == undefined) {
      this.lancamentoService.criarLancamento(this.lancamento).then(res => {
        console.log(res);
        this.dismiss();
      }).catch(error => console.log(error));
    } else {
      this.lancamentoService.atualizarLancamento(this.key, this.lancamento).then(res => {
        console.log(res);
        this.dismiss();
      }).catch(error => console.log(error));
    }
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
