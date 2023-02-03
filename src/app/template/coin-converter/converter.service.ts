import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  constructor(private http: HttpClient) { }
  getConverterAPI(): Observable<any>{
    return this.http.get("https://api.exchangerate.host/latest");
  }
}
