import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ConverterService } from './converter.service';
import { ListService } from '../coin-list/list.service';
import { Moeda } from 'src/app/model/moeda';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogLimparComponent } from './dialog-limpar/dialog-limpar.component';

@Component({
  selector: 'app-coin-converter',
  templateUrl: './coin-converter.component.html',
  styleUrls: ['./coin-converter.component.css']
})
export class CoinConverterComponent implements OnInit {
  arraySymbols: Array<Moeda>;
  convert: any;
  displayedColumns = ['data', 'hora', 'entrada', 'origem', 'saida', 'destino', 'taxa'];
  data: Date;
  dataSource: MatTableDataSource<Object> = new MatTableDataSource(JSON.parse(localStorage.getItem('dados') || '{}'));
  entrada: number;
  resultado: number;
  conversao: boolean = false;
  moedaOrigem: Moeda = { code: 'USD', description: 'United States Dollar'};
  moedaDestino: Moeda = { code: 'BRL', description: 'Brazilian Real' };
 
  constructor(private convertService: ConverterService, private listService: ListService, public dialog: MatDialog) { }
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() { this.fetchAPIConvert(); this.fetchListSymbols(); }

  fetchAPIConvert() {
    this.convertService.getConvert().subscribe(s => {
      this.convert = s;
      this.data = s.date;
      this.entrada = s.query.amount;
      this.resultado = s.result;
      this.dataSource.sort = this.matSort;
      this.dataSource.paginator = this.paginator;
      if(this.conversao)
        this.armazenar();
    });
  }
  fetchListSymbols() {
    this.listService.getList().subscribe(l => {
      this.arraySymbols = Object.values(l.symbols);
    });
  }
  changeNameOrigem(code: string, nome: string) {
    this.moedaOrigem = {code: code, description: nome};
    this.convertService.codeFrom = code;
  }
  changeNameDestino(code: string, nome: string) {
    this.moedaDestino = {code: code, description: nome};
    this.convertService.codeTo = code;

  }
  toggle() {
    let toggleMoeda = this.moedaOrigem;
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
      this.conversao = true
      this.fetchAPIConvert();
    }
  }
  select($event: any){
    $event.target.select()
  }
  armazenar() {
    const dados = {
      data: this.data,
      hora: `${new Date().getHours()}:${new Date().getMinutes()}`,
      entrada: this.entrada,
      saida: this.resultado,
      origem: this.moedaOrigem,
      destino: this.moedaDestino,
      taxa: this.convert.info.rate
    }
    var conversoes = localStorage.getItem("dados") && dados.entrada > 0 ? JSON.parse(localStorage.getItem("dados") || '{}') : [];
    conversoes.push(dados);
    localStorage.setItem("dados", JSON.stringify(conversoes));
    this.dataSource = new MatTableDataSource(JSON.parse(localStorage.getItem('dados') || '{}'));
  }
  openDialogLimpar() {
    const dialogRef = this.dialog.open(DialogLimparComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}