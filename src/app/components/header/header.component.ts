import { CommonModule } from '@angular/common';
import { afterRender, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {


  constructor(){
    afterRender(() =>{
      const menu: HTMLElement | null = document.querySelector('#menu');

    if (menu) {
      menu.classList.toggle('hidden')
    }
    })
  }

  abrirMenu() {

  }
}
