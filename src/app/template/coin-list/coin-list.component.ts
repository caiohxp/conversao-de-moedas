import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListService } from './list.service';
import { Moeda } from 'src/app/model/moeda';
import { MatSort, MatSortHeader } from '@angular/material/sort';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent implements AfterViewInit {

  displayedColumns = ['code', 'description'];
  dataSource: MatTableDataSource<any>;
  constructor(private listService: ListService) {
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;
  ngAfterViewInit(): void {
    this.fetchList();
  }
  fetchList(){
    this.listService.getList().subscribe(s => {
      this.dataSource = new MatTableDataSource(Object.values(s.symbols));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
      console.log(Object.values(s.symbols));
    });
  }
  filtrarMoedas($event: any){
    this.dataSource.filter = $event.target.value;
  }
}