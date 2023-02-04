import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ConverterService } from './converter.service';
import { ListService } from '../coin-list/list.service';
import { Moeda } from 'src/app/model/moeda';


@Component({
  selector: 'app-coin-converter',
  templateUrl: './coin-converter.component.html',
  styleUrls: ['./coin-converter.component.css']
})
export class CoinConverterComponent implements OnInit {
  arrayKeys: Array<any>;
  arrayRates: Array<any>;
  arraySymbols: Array<any>;
  arrayMoedas: Array<Object>;
  data: Date;
  resultado: number;
  moedaOrigem: Moeda = {code: "EUR", value: 1};
  moedaDestino: Moeda = {code: "BRA", value: 5};
  displayedColumns = ['code', 'description'];

  constructor(private convertService: ConverterService, private listService: ListService) { }
  ngOnInit() { this.fetchMoedas();}
  fetchAPI() {
    this.convertService.getList().subscribe(s => {
      this.data = s.date;
      this.arrayKeys = Object.keys(s.rates);
      this.arrayRates = Object.entries(s.rates);
      console.log(this.arrayRates);

    });
    this.listService.getList().subscribe(l => {
      this.arraySymbols = Object.values(l.symbols)
      console.log((this.arraySymbols));

    });
  }
  fetchMoedas() {
    this.fetchAPI()
    this.arrayMoedas = this.arrayRates.map(r => {
      let x: any;
      this.arraySymbols.forEach(s => {
        if (s.code == r[0])
          x = { code: s.code, description: s.description, value: r[1] }
      })
      return x;
    })
    
    
  }
  changeNameOrigem(a: Array<any>) {
    console.log(a[1]);
    
    this.moedaOrigem = {code: a[0], value: a[1]};
    console.log(this.arrayMoedas);
    
    
  }
  changeNameDestino(a: Array<any>) {
    this.moedaDestino = {code: a[0], value: a[1]};
  }
  calc($event: any){
    this.resultado = ($event.target.value/this.moedaOrigem.value) * this.moedaDestino.value;
    
  }
}