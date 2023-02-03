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
  arrayMoedas: Array<any>;
  data: Date;
  resultado: string;
  moedaOrigem: string = "Moeda Origem";
  moedaDestino: string = "Moeda Destino";
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
  changeNameOrigem(nome: string) {
    this.moedaOrigem = nome;
    
  }
  changeNameDestino(nome: string) {
    this.moedaDestino = nome;
  }
  calc($event: any){
    this.resultado = $event.target.value;
  }
}