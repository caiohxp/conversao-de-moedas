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
  filtro = false;
  tipoDeFiltro: Filtro;
  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    this.symbols$ = this.http.get("https://api.exchangerate.host/symbols");
    this.symbols$.subscribe(s => this.arraySymbols = Object.values(s.symbols));

  }
  SemFiltro() {
    this.filtro = false;
  }
  filtrarSigla() {
    this.filtro = true;
    this.tipoDeFiltro = Filtro.Sigla;

    console.log(this.tipoDeFiltro);

  }
  filtrarNome() {
    this.filtro = true;
    this.tipoDeFiltro = Filtro.Nome;
  }
  filtrarMoedas(symbol: any[]) {
    const input = (<HTMLInputElement>document.querySelector('#input-filtro')).value;
    const select = document.querySelectorAll('.form-select');
    const selectCampo = (<HTMLInputElement>select[0]).value;
    const selectOrdem = (<HTMLInputElement>select[1]).value;
    let array: any[];
    if (selectCampo == 's')
      array = symbol.filter((s, i) => s.code.includes(input.toUpperCase()) && s.code.charAt(0) === input.toUpperCase().charAt(0)).reverse();
    else if (selectCampo == 'n')
      array = symbol.filter(s => s.description.toLowerCase().includes(input.toLowerCase()));
    else array = symbol;
    if(selectOrdem == 'c') array.sort();
    else if(selectOrdem == 'd') array.sort().reverse();

    return array;
  }
  callSymbols(): Object[] {
    var requestURL = 'https://api.exchangerate.host/symbols';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
      var response = request.response;
      return Object.values(response.symbols);
    }
    return Object.values(request.response);
  }
}
// const getSymbols = () => {

//   var requestURL = 'https://api.exchangerate.host/symbols';
//   var request = new XMLHttpRequest();
//   request.open('GET', requestURL);
//   request.responseType = 'json';
//   request.send();

//   request.onload = function () {
//     return Object.values(request.response.symbols);
//   }
// }
// const getSymbols = async () => {
//   fetch("https://api.exchangerate.host/symbols")
//     .then((response) => response.json())
//     .then((responseJson) => {
//       return Object.values(responseJson.symbols)
//     })

// }
// const getContatos = () => {
//   fetch("https://api.exchangerate.host/symbols")
//     .then((response) => response.json())
//     .then((responseJson) => {
//       return responseJson
//     })
// }
// console.log(getSymbols)