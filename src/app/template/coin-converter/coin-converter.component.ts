import { Component } from '@angular/core';

@Component({
  selector: 'app-coin-converter',
  templateUrl: './coin-converter.component.html',
  styleUrls: ['./coin-converter.component.css']
})
export class CoinConverterComponent {
  arraySymbols = [{code: "BRA", description: "Brasil"}, {code: "BRA", description: "Brasil"}, {code: "BRA", description: "Brasil"}]
  displayedColumns = ['code', 'description'];
}
// var requestURL = 'https://api.exchangerate.host/latest';
// var request = new XMLHttpRequest();
// request.open('GET', requestURL);
// request.responseType = 'json';
// request.send();

// request.onload = function() {
//   var response = request.response;
//   console.log(response.rates);
// }
    