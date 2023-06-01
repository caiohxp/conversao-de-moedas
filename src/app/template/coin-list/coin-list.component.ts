import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListService } from './list.service';
import { MatSort } from '@angular/material/sort';
import { Moeda } from 'src/app/model/moeda';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent implements AfterViewInit {

  displayedColumns = ['code', 'description'];
  dataSource: MatTableDataSource<Moeda>;
  constructor(private listService: ListService) {
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;
  ngAfterViewInit(): void {
    this.fetchList();
  }
  fetchList(){
    this.listService.getList().subscribe(s => {
      let arraySymbols: Array<Moeda> = Object.values(s.symbols);
      arraySymbols = arraySymbols.filter(f => f.code !== 'MRO' && f.code !== 'VEF');
      this.dataSource = new MatTableDataSource(arraySymbols);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    });
  }
  filtrarMoedas($event: any){
    this.dataSource.filter = $event.target.value;
  }
}