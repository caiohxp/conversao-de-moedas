import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent implements OnInit {

  public symbols$: Observable<any>;
  arraySymbols: Array<any>;
  arraySymbol: Symbol[];
  displayedColumns = ['code', 'description'];
  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    this.symbols$ = this.http.get("https://api.exchangerate.host/symbols");
    this.symbols$.subscribe(s => this.arraySymbols = Object.values(s.symbols));

  }
  SemFiltro() {
  }
  filtrarSigla() {
  }
  X(){

  }
  filtrarNome() {
    
  }
  filtrarMoedas() {
    const input = (<HTMLInputElement>document.querySelector('#input-filtro')).value;
    const select = document.querySelectorAll('.form-select');
    var campo: string = "";
    const radioCampo = document.getElementsByName('flexRadioCampo');
    radioCampo.forEach(c => campo = (<HTMLInputElement>c).checked?(<HTMLInputElement>c).value : campo);
    var ordem: string = "";
    const radioOrdem = document.getElementsByName('flexRadioOrdem');
    radioOrdem.forEach(c => ordem = (<HTMLInputElement>c).checked?(<HTMLInputElement>c).value : ordem)
    const selectPaginacao = parseInt((<HTMLInputElement>select[0]).value);
    
    let array: any[];
    if (campo == 's')
      array = this.arraySymbols.filter(s => s.code.includes(input.toUpperCase()) && s.code.charAt(0) === input.toUpperCase().charAt(0)).filter((f,i) => i < selectPaginacao);
    else if (campo == 'n')
      array = this.arraySymbols.filter(s => s.description.toLowerCase().includes(input.toLowerCase())).filter((f,i) => i < selectPaginacao);
    else array = this.arraySymbols.filter((s, i) => i < selectPaginacao);
    if(ordem == 'c') array.sort();
    else if(ordem == 'd') array.sort().reverse();

    return array;
  }
}