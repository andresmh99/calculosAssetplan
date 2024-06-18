import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-descuentos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './descuentos.component.html',
  styleUrl: './descuentos.component.css'
})
export class DescuentosComponent {

  canonMensual: number = 0;

  fechaInicio: Date = new Date();
  fechaFinal: Date = new Date();
  diasDescuento: number = 0;
  tasaDescuento: number = 0;
  descuentos: { mes: string, diasDescontados: number, montoDescuento: number }[] = [];
  totalDescuento: number = 0;

  constructor() {
    //this.fechaInicio = new Date('2023-07-15T00:00:00'); // Fecha de inicio de ejemplo con hora inicializada a 00:00:00
  }

  form = new FormGroup({
    fechaInicio: new FormControl(),
    diasDescuento: new FormControl(),
    tasaDescuento: new FormControl(),
    canonMensual: new FormControl(),
  })

  ngOnInit(): void {
  }

  calcularDescuentos() {
    const valores = this.form.value;
  
    // Convertir la fecha de inicio a un objeto Date
    this.fechaInicio = new Date(valores.fechaInicio + 'T00:00:00');
  
    // Calcular la fecha final sumando los días de descuento a la fecha de inicio
    const fin = new Date(this.fechaInicio);
    fin.setDate(fin.getDate() + valores.diasDescuento);
    this.fechaFinal = fin;
  
    // Inicializar variables
    let fechaActual = new Date(this.fechaInicio);
    this.descuentos = [];
    this.totalDescuento = 0;
  
    // Iterar hasta llegar a la fecha final
    while (fechaActual < fin) {
      const year = fechaActual.getFullYear();
      const month = fechaActual.getMonth();
      const diasEnMes = new Date(year, month + 1, 0).getDate();
      const diasRestantesEnMes = diasEnMes - fechaActual.getDate() + 1;
  
      // Calcular días a descontar
      let diasDescontar = Math.min(diasRestantesEnMes, valores.diasDescuento);
  
      // Ajuste para contar correctamente el día inicial
      if (fechaActual.getDate() === this.fechaInicio.getDate()) {
        diasDescontar--; // Restar 1 día para incluir el día inicial
      }
  
      const montoDescuento = diasDescontar * valores.canonMensual / diasEnMes * (valores.tasaDescuento / 100);
      this.totalDescuento += montoDescuento;
  
      // Buscar si ya existe un registro para el mes actual
      const mesActual = fechaActual.toLocaleString('default', { month: 'long' });
      const descuentoExistente = this.descuentos.find(d => d.mes === mesActual);
  
      if (descuentoExistente) {
        // Si ya existe, sumar al registro existente
        descuentoExistente.diasDescontados += diasDescontar;
        descuentoExistente.montoDescuento += montoDescuento;
      } else {
        // Si no existe, crear un nuevo registro
        this.descuentos.push({
          mes: mesActual,
          diasDescontados: diasDescontar,
          montoDescuento: montoDescuento
        });
      }
  
      // Avanzar la fecha actual al siguiente periodo
      fechaActual.setDate(fechaActual.getDate() + diasDescontar);
      valores.diasDescuento -= diasDescontar; // Actualizar los días de descuento restantes
    }

  }
  



  mostrarValores(){
    this.diasDescuento = this.form.value.diasDescuento
    this.canonMensual = this.form.value.canonMensual
    this.tasaDescuento = this.form.value.tasaDescuento
  }
  

}
