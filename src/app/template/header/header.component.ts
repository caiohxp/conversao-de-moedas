import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menu_itens = ["Home", "List", "Converter"];
  menuItemColor(item: string | null | undefined){
    const itensMenu : string | null | undefined = document.querySelector('.menu__item')?.textContent;
    console.log(item,itensMenu)
    console.log(typeof(item), typeof(itensMenu))
    console.log(itensMenu == item? itensMenu:"Outro")
  }
}
