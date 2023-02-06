import { Component } from '@angular/core';
import { CoinConverterComponent } from '../coin-converter.component';

@Component({
  selector: 'app-dialog-limpar',
  templateUrl: './dialog-limpar.component.html',
  styleUrls: ['./dialog-limpar.component.css']
})
export class DialogLimparComponent {
  apagarHistorico(){
    localStorage.removeItem("dados");
    window.location.reload();
  }
}
