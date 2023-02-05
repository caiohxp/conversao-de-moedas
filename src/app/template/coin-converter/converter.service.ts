import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Moeda } from 'src/app/model/moeda';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  codeFrom: string = 'USD';
  codeTo: string = 'BRL';
  valueAmount: number = 1;
  constructor(private http: HttpClient) { }
  getConvert(): Observable<any>{
    return this.http.get(`https://api.exchangerate.host/convert?from=${this.codeFrom}&to=${this.codeTo}&amount=${this.valueAmount}`);
  }
} 
