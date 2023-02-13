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
    const local = JSON.parse(localStorage.getItem("dados") || '{}');
    const localFiltered = local.filter(l => l.id !== this.idDados);
    localFiltered.length === 0? localStorage.removeItem("dados") : localStorage.setItem("dados", JSON.stringify(localFiltered));
    window.location.reload()
  }
}
