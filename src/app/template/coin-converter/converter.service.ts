import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoinConverterComponent } from './coin-converter.component';
import { Moeda } from 'src/app/model/moeda';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  codeFrom: string;
  codeTo: string;
  valueAmount: number;
  constructor(private http: HttpClient) { }
  getConvert(): Observable<any>{
    return this.http.get(`https://api.exchangerate.host/convert?from=${this.codeFrom}&to=${this.codeTo}&amount=${this.valueAmount}`);
  }
  getConvertToUSD(): Observable<any>{
    return this.http.get(`https://api.exchangerate.host/convert?from=${this.codeFrom}&to=USD&amount=${this.valueAmount}`);
  }
} 
