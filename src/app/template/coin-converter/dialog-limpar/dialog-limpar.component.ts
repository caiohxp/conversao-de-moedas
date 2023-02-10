import { Component } from '@angular/core';
import { CoinConverterComponent } from '../coin-converter.component';

@Component({
  selector: 'app-dialog-limpar',
  templateUrl: './dialog-limpar.component.html',
  styleUrls: ['./dialog-limpar.component.css']
})
export class DialogLimparComponent {
  idDados = CoinConverterComponent.idDados;
  apagarHistorico(){
    localStorage.removeItem("dados");
    window.location.reload();
  }
  deletarItem(){
    let local = JSON.parse(localStorage.getItem("dados") || '{}');
    let localFiltered = local.filter(l => l.id !== this.idDados);
    
    localStorage.setItem("dados", JSON.stringify(localFiltered));
    window.location.reload()
  }
}
