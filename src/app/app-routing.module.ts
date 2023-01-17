import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinConverterComponent } from './template/coin-converter/coin-converter.component';
import { CoinListComponent } from './template/coin-list/coin-list.component';
import { HomeComponent } from './template/home/home.component';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "list", component: CoinListComponent},
  {path: "converter", component: CoinConverterComponent},
  {path: "", redirectTo: "/home", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
