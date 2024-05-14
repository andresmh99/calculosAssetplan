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

  menu: HTMLElement | null = null;

  constructor(){
    afterRender(() =>{
      this.menu = document.querySelector('#menu');


    })
  }

  abrirMenu() {
    console.log(this.menu);
    console.log('hola');
    if (this.menu) {
      this.menu.classList.toggle('hidden')
    }
  }
}
