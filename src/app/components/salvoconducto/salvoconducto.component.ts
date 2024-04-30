import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Uf } from '../../interfaces/Iuf';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-salvoconducto',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './salvoconducto.component.html',
  styleUrl: './salvoconducto.component.css',
})
export class SalvoconductoComponent {
  data: Uf[] = [];
  fecha: Date = new Date();
  valorUF: number = 0;
  ufContrato: number = 0.2;
  precioMetroCubico: number = 0;
  lecturaInicial: number = 0;
  lecturaFinal: number = 0;
  consumoTotal: number = 0;
  totalPago: number = 0;
  isChecked: boolean = false;
  readonly: boolean = false;

  fechaInicio: Date = new Date();
  fechaFinal: Date = new Date();
  cantidadDiasMes: number = 0;
  rango: number = 0;
  cupon: number = 0;
  diasAPargar: number = 0;
  valorDia: number = 0;
  totalCupon: number = 0;
  descuentoCupon: number = 0;

  form = new FormGroup({
    id: new FormControl(''),
    ufContrato: new FormControl(),
    lecturaInicial: new FormControl(),
    lecturaFinal: new FormControl(),
    fechaInicio: new FormControl(),
    fechaFinal: new FormControl(),
    cupon: new FormControl(),

  });

  constructor(private ufService: ApiService) {}

  ngOnInit(): void {
    this.obtenerValorUF();
    this.calcularPrecioMetroCubico();
    this.modificarValorContrato();
  }

  mostrarFecha() {
    this.fechaInicio = new Date(this.form.value.fechaInicio);
    this.fechaFinal = new Date(this.form.value.fechaFinal);

    const diferencia = this.fechaFinal.getTime() - this.fechaInicio.getTime();

    this.rango = Math.round(diferencia / (1000 * 3600 * 24));

    const fechaSeleccionada = new Date(this.fechaInicio); // Ejemplo: 15 de abril de 2024
    const cantidadDias = this.obtenerDiasDelMes(fechaSeleccionada);
    console.log('Cantidad de días en el mes seleccionado:', cantidadDias);
    console.log(new Date(2024, 2, 0).getDate());


  }
  calcularValorDia(){

    this.cupon = this.form.value.cupon;
    this.totalCupon = (this.cupon/this.cantidadDiasMes) * this.diasAPargar
    this.descuentoCupon = this.cupon - this.totalCupon
  }

  mostrarCantidadDiasMes() {
    this.fechaInicio = new Date(this.form.value.fechaInicio);
    const fechaSeleccionada = new Date(this.fechaInicio);
    this.cantidadDiasMes = this.obtenerDiasDelMes(fechaSeleccionada);
    this.diasAPargar = fechaSeleccionada.getDate() + 1
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
    console.log(ultimoDiaDelMes);

    return cantidadDias;
  }

  obtenerValorUF() {
    this.ufService.obtenerValorUF().subscribe((res) => {
      res.UFs.map((uf) => {
        this.valorUF = parseFloat(uf.Valor.replace('.', ''));
        this.fecha = uf.Fecha;
      });
    });
  }

  calcularPrecioMetroCubico() {
    this.ufContrato = this.form.value.ufContrato;
    this.precioMetroCubico = this.ufContrato * this.valorUF;
    this.calcularPagoTotal(this.precioMetroCubico, this.consumoTotal);
  }
  modificarValorContrato() {
    this.readonly = !this.readonly;
    if (!this.isChecked) {
      this.ufContrato = 0.2;
      this.precioMetroCubico = this.ufContrato * this.valorUF;
      this.calcularPagoTotal(this.precioMetroCubico, this.consumoTotal);
    } else {
      this.ufContrato = this.form.value.ufContrato;
      this.precioMetroCubico = this.ufContrato * this.valorUF;
      this.calcularPagoTotal(this.precioMetroCubico, this.consumoTotal);
    }
  }
  calcularConsumoAguaCaliente() {
    this.lecturaInicial = this.form.value.lecturaInicial;
    this.lecturaFinal = this.form.value.lecturaFinal;
    this.consumoTotal = this.lecturaFinal - this.lecturaInicial;
    this.calcularPagoTotal(this.precioMetroCubico, this.consumoTotal);
  }
  calcularPagoTotal(precioMetroCubico: number, consumoTotal: number) {
    this.totalPago = consumoTotal * precioMetroCubico;
  }
}
