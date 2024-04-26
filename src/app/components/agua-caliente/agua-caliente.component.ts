import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-agua-caliente',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,],
  templateUrl: './agua-caliente.component.html',
  styleUrl: './agua-caliente.component.css'
})
export class AguaCalienteComponent {

  form = new FormGroup({
    id: new FormControl(''),
    nombreProducto: new FormControl(''),
    descripcion: new FormControl(''),
    precioVenta: new FormControl(''),
    precioCompra: new FormControl(''),
    sku: new FormControl(''),
    marca: new FormControl(''),
    stock: new FormControl(''),
    imagen: new FormControl(),
    sourceFile: new FormControl(),
    idCategoria: new FormControl(''),
  });

  calcularAguaCaliente(){

  }

}
