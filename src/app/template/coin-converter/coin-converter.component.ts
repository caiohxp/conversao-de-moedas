import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ConverterService } from './converter.service';


@Component({
  selector: 'app-coin-converter',
  templateUrl: './coin-converter.component.html',
  styleUrls: ['./coin-converter.component.css']
})
export class CoinConverterComponent {
  arraySymbols: Array<any>;
  displayedColumns = ['code', 'description'];

  constructor(private convertAPI: ConverterService){}
  NgAfterViewInit(){
    console.log(3);
    
    console.log(this.convertAPI.getConverterAPI());
    
    this.fetchAPI()
  }
  fetchAPI(){
    console.log();
    
    this.convertAPI.getConverterAPI().subscribe(s => {
      console.log(s);
      
    });
  }

}