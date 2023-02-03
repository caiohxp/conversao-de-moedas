import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Moeda } from 'src/app/model/moeda';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  constructor(private http: HttpClient) { }
  getList(): Observable<any>{
    return this.http.get("https://api.exchangerate.host/latest");
  }
} 
