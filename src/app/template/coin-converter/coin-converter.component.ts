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
  arraySymbols: Array<any>;
  convert: any;
  data: Date;
  entrada: number;
  resultado: number;
  moedaOrigem = ['USD', 'United States Dollar'];
  moedaDestino = ["BRL, Brazilian Real"];

  constructor(private convertService: ConverterService, private listService: ListService) { }
  ngOnInit() { this.fetchAPIConvert(); this.fetchListSymbols(); }
  fetchAPIConvert() {
    this.convertService.getConvert().subscribe(s => {
      this.convert = s;
      this.data = s.date;
      this.entrada = s.query.amount;
      this.resultado = s.result;
    });
  }
  fetchListSymbols() {
    this.listService.getList().subscribe(l => {
      this.arraySymbols = Object.values(l.symbols);
    });
  }
  changeNameOrigem(code: string, nome: string) {
    this.moedaOrigem = [code, nome];
    this.convertService.codeFrom = code;
  }
  changeNameDestino(code: string, nome: string) {
    this.moedaDestino = [code, nome];;
    this.convertService.codeTo = code;

  }
  toggle() {
    let toggleMoeda = this.moedaOrigem;
    this.moedaOrigem = this.moedaDestino;
    this.moedaDestino = toggleMoeda;
    this.convertService.codeFrom = this.moedaOrigem[0];
    this.convertService.codeTo = this.moedaDestino[0];
  }
  calc($event: any) {
    this.convertService.valueAmount = $event.target.value;
  }
  converter() {
    this.fetchAPIConvert();
    this.fetchAPIConvert();
  }
}