import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule} from '@angular/common';
import { cupon } from '../../interfaces/ICupones';
import { __values } from 'tslib';

@Component({
  selector: 'app-salvoconducto',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './salvoconducto.component.html',
  styleUrl: './salvoconducto.component.css',
})
export class SalvoconductoComponent {
  fecha: Date = new Date();
  fechaInicio: Date = new Date();
  fechaFinal: Date = new Date();
  cantidadDiasMes: number = 0;
  rango: number = 0;
  cupon: number = 0;
  diasAPargar: number = 0;
  valorDia: number = 0;
  totalCupon: number = 0;
  descuentoCupon: number = 0;

  cupones: cupon[] = [];
  tipoCupon = ['Arriendo', 'Gasto Comun', 'Energía Eléctrica', 'Agua'];

  form = new FormGroup({
    id: new FormControl(''),
    ufContrato: new FormControl(),
    lecturaInicial: new FormControl(),
    lecturaFinal: new FormControl(),
    fechaInicio: new FormControl(),
    fechaFinal: new FormControl(),
    cupon: new FormControl(),
    TipoCupon: new FormControl(),
  });

  constructor() {}

  ngOnInit(): void {}


  calcularValorDia() {
    this.cupon = this.form.value.cupon;
    this.totalCupon = (this.cupon / this.cantidadDiasMes) * this.diasAPargar;
    this.descuentoCupon = this.cupon - this.totalCupon;
  }

  mostrarCantidadDiasMes() {
    this.fechaInicio = new Date(this.form.value.fechaInicio);
    const fechaSeleccionada = new Date(this.fechaInicio);
    this.cantidadDiasMes = this.obtenerDiasDelMes(fechaSeleccionada);
    this.diasAPargar = fechaSeleccionada.getDate() + 1;
  }

  obtenerDiasDelMes(fecha: Date): number {
    // Obtenemos el año y el mes de la fecha seleccionada
    const year = fecha.getFullYear();
    const month = fecha.getMonth() + 1; // Se agrega 1 porque los meses van de 0 a 11 en JavaScript

    // Creamos una nueva fecha con el primer día del siguiente mes
    // y restamos 1 día para obtener el último día del mes actual
    const ultimoDiaDelMes = new Date(year, month, 0);

    // Obtenemos el día del mes (el número de días)
    const cantidadDias = ultimoDiaDelMes.getDate();

    return cantidadDias;
  }

  guardarCupon() {
    const cupon: cupon = {
      tipoCupon: this.form.value.TipoCupon,
      fecha: this.form.value.fechaInicio,
      descripcion: `(${this.cupon}/${this.cantidadDiasMes})*${
        this.diasAPargar
      } = ${Math.round(this.totalCupon)}`,
      monto: this.totalCupon,
      descuento: this.descuentoCupon,
      total: this.totalCupon,
      valorDia: this.cupon / this.cantidadDiasMes,
    };
    if(this.form.valid){
      this.cupones.push(cupon);
      this.form.controls.cupon.reset()
      this.form.controls.TipoCupon.reset()
    }

  }

  resetValues(){
    this.form.reset()
    this.diasAPargar = 0
    this.cantidadDiasMes = 0
    this.totalCupon = 0
    this.descuentoCupon = 0
    this.cupon = 0
  }
}
