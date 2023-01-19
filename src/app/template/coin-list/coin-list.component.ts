import { Component } from '@angular/core';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent {

  callSymbols(): Object[] {
    var requestURL = 'https://api.exchangerate.host/symbols';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
      var response = request.response;
      return Object.values(response.symbols);
    }
    return Object.values(request.response);
  }
}
// const getSymbols = () => {

//   var requestURL = 'https://api.exchangerate.host/symbols';
//   var request = new XMLHttpRequest();
//   request.open('GET', requestURL);
//   request.responseType = 'json';
//   request.send();

//   request.onload = function () {
//     return Object.values(request.response.symbols);
//   }
// }
// const getSymbols = async () => {
//   fetch("https://api.exchangerate.host/symbols")
//     .then((response) => response.json())
//     .then((responseJson) => {
//       return Object.values(responseJson.symbols)
//     })

// }
// const getContatos = () => {
//   fetch("https://api.exchangerate.host/symbols")
//     .then((response) => response.json())
//     .then((responseJson) => {
//       return responseJson
//     })
// }
// console.log(getSymbols)