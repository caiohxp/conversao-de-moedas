import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent implements AfterViewInit {

  displayedColumns = ['code', 'description'];
  dataSource = new MatTableDataSource<Moedas>(element)

  public symbols$: Observable<any>;
  arraySymbols: Array<Moedas>;
  constructor(private http: HttpClient) {
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit(): void {
    this.symbols$ = this.http.get("https://api.exchangerate.host/symbols");
    this.symbols$.subscribe(s => this.arraySymbols = Object.values(s.symbols));
    this.dataSource.paginator = this.paginator;
    this.filtrarMoedas().paginator = this.paginator;
  }
  filtrarMoedas(): MatTableDataSource<Moedas> {
    const input = (<HTMLInputElement>document.querySelector('#input-filtro')).value;
    var campo: string = "";
    const radioCampo = document.getElementsByName('flexRadioCampo');
    radioCampo.forEach(c => campo = (<HTMLInputElement>c).checked?(<HTMLInputElement>c).value : campo);
    var ordem: string = "";
    const radioOrdem = document.getElementsByName('flexRadioOrdem');
    radioOrdem.forEach(c => ordem = (<HTMLInputElement>c).checked?(<HTMLInputElement>c).value : ordem);
    
    let array: Moedas[];
    if (campo == 's')
      array = this.arraySymbols.filter(s => s.code.includes(input.toUpperCase()) && s.code.charAt(0) === input.toUpperCase().charAt(0));
    else if (campo == 'n')
      array = this.arraySymbols.filter(s => s.description.toLowerCase().includes(input.toLowerCase()));
    else array = this.arraySymbols;
    if(ordem == 'c') array.sort();
    else if(ordem == 'd') array.sort().reverse();
    let tableDS = new MatTableDataSource(array);
    
    return tableDS;
  }
}

export interface Moedas{
  code: string,
  description: string
}

const element: Moedas[] = [
  {code: "A24", description: "olaaa"},
  {code: "ASD", description: "adoaqjdo"},
  {code: "EDF", description: "errs"},
  {code: "WED", description: "qra"},
  {code: "EFD", description: "afaf"},
  {code: "ERY", description: "ad"},
  {code: "GDD", description: "afdaf"},
]
