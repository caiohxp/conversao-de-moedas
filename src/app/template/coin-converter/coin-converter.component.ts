import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { ConverterService } from './converter.service';
import { ListService } from '../coin-list/list.service';
import { Moeda } from 'src/app/model/moeda';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogLimparComponent } from './dialog-limpar/dialog-limpar.component';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-coin-converter',
  templateUrl: './coin-converter.component.html',
  styleUrls: ['./coin-converter.component.css']
})
export class CoinConverterComponent implements OnInit, OnDestroy, AfterViewInit {
  arraySymbols: Array<Moeda>;
  displayedColumns = ['data', 'hora', 'entrada', 'origem', 'saida', 'destino', 'taxa', 'excluir'];
  data: Date;
  storage = localStorage.getItem("dados");
  arrayStorage = JSON.parse(this.storage || '{}')
  dataSource: MatTableDataSource<Object> = new MatTableDataSource(this.arrayStorage);
  lastConvert = this.arrayStorage[this.arrayStorage.length - 1];
  moedaOrigem: Moeda = this.storage ? this.lastConvert.origem : { code: 'USD', description: 'United States Dollar' };
  moedaDestino: Moeda = this.storage ? this.lastConvert.destino : { code: 'BRL', description: 'Brazilian Real' };
  entrada: number;
  taxa: number;
  resultado: number;
  isConverted: boolean = false;
  resultadodollar: number;
  static idDados: number = -1;

  constructor(private convertService: ConverterService, private listService: ListService, public dialog: MatDialog) { }
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    console.log(this.arrayStorage);

    this.convertService.codeFrom = this.moedaOrigem.code;
    this.convertService.codeTo = this.moedaDestino.code;
    this.convertService.valueAmount = this.storage ? this.lastConvert.entrada : 1;
    this.fetchAPIConvert();
    this.fetchListSymbols();
  }
  ngAfterViewInit(): void {

  }
  ngOnDestroy(): void {
  }
  fetchAPIConvert() {
    const currencyConvert = this.convertService.getConvert();
    const usdConvert = this.convertService.getConvertToUSD();
    combineLatest(usdConvert, currencyConvert).subscribe(([u, c]) => {
      this.resultadodollar = u.result;
      this.data = c.date;
      this.entrada = c.query.amount;
      this.convertService.valueAmount = this.entrada;
      this.taxa = c.info.rate;
      this.resultado = c.result;
      if (this.isConverted)
        this.armazenar();
      this.dataSource.sort = this.matSort;
      this.dataSource.paginator = this.paginator;
    })
  }
  fetchListSymbols() {
    this.listService.getList().subscribe(l => {
      this.arraySymbols = Object.values(l.symbols);
      this.arraySymbols = this.arraySymbols.filter(f => f.code != 'MRO' && f.code !== 'VEF');
    });
  }
  changeNameOrigem(code: string, nome: string) {
    this.moedaOrigem = { code: code, description: nome };
    this.convertService.codeFrom = code;
  }
  changeNameDestino(code: string, nome: string) {
    this.moedaDestino = { code: code, description: nome };
    this.convertService.codeTo = code;

  }
  toggle() {
    const toggleMoeda = this.moedaOrigem;
    this.moedaOrigem = this.moedaDestino;
    this.moedaDestino = toggleMoeda;
    this.convertService.codeFrom = this.moedaOrigem.code;
    this.convertService.codeTo = this.moedaDestino.code;
  }
  valorEntrada($event: any) {
    this.convertService.valueAmount = $event.target.value;
  }
  converter() {
    if (this.convertService.valueAmount > 0) {
      this.isConverted = true
      this.fetchAPIConvert();
    }
  }
  select($event: any) {
    $event.target.select()
  }
  armazenar() {
    const dados = {
      id: Number,
      data: this.data,
      hora: `${new Date().getHours()}h${new Date().getMinutes()}`,
      entrada: this.entrada,
      valoralto: false,
      saida: this.resultado,
      origem: this.moedaOrigem,
      destino: this.moedaDestino,
      taxa: this.taxa
    }
    const storage = localStorage.getItem("dados");
    const conversoes = storage && dados.entrada > 0 ? JSON.parse(storage || '{}') : [];
    dados.id = conversoes.length;
    console.log(dados);
    if (this.convertService.codeFrom === "USD" && dados.entrada > 10000)
      dados.valoralto = true
    else if (this.resultadodollar > 10000)
      dados.valoralto = true
    conversoes.push(dados);
    localStorage.setItem("dados", JSON.stringify(conversoes));
    this.dataSource = new MatTableDataSource(JSON.parse(localStorage.getItem('dados') || '{}'));
  }
  openDialogLimpar(id?: number) {
    id != undefined ? CoinConverterComponent.idDados = id : CoinConverterComponent.idDados = -1;
    const dialogRef = this.dialog.open(DialogLimparComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}