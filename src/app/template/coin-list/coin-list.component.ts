import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { Filtro } from './filtro';

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
  tipoDeFiltro: Filtro;
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
  filtrarNome() {
    
  }
  filtrarMoedas(symbol: any[]) {
    const input = (<HTMLInputElement>document.querySelector('#input-filtro')).value;
    const select = document.querySelectorAll('.form-select');
    const selectCampo = (<HTMLInputElement>select[0]).value;
    const selectOrdem = (<HTMLInputElement>select[1]).value;
    const selectPaginacao = parseInt((<HTMLInputElement>select[2]).value);
    
    let array: any[];
    if (selectCampo == 's')
      array = symbol.filter((s, i) => s.code.includes(input.toUpperCase()) && s.code.charAt(0) === input.toUpperCase().charAt(0) && i < selectPaginacao);
    else if (selectCampo == 'n')
      array = symbol.filter((s, i) => s.description.toLowerCase().includes(input.toLowerCase()) && i < selectPaginacao);
    else array = symbol.filter((s, i) => i < selectPaginacao);
    if(selectOrdem == 'c') array.sort();
    else if(selectOrdem == 'd') array.sort().reverse();

    return array;
  }
}