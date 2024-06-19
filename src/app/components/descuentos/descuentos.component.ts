import { CommonModule} from '@angular/common';
import { Component } from '@angular/core';
import {  FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  tasaDescuento: number = 50;
  descuentos: { mes: string, diasDescontados: number, montoDescuento: number }[] = [];
  totalDescuento: number = 0;

  constructor() {
    //this.fechaInicio = new Date('2023-07-15T00:00:00'); // Fecha de inicio de ejemplo con hora inicializada a 00:00:00
  }

  form = new FormGroup({
    fechaInicio: new FormControl(),
    diasDescuento: new FormControl(),
    tasaDescuento: new FormControl(this.tasaDescuento),
    canonMensual: new FormControl(),
  })

  ngOnInit(): void {
    this.form.get('tasaDescuento')?.setValue(this.tasaDescuento); // Asegura que el form control tenga el valor inicial
  }

  calcularDescuentos() {
    
      const { fechaInicio, diasDescuento, canonMensual } = this.form.value;
      if(fechaInicio){
      let { tasaDescuento } = this.form.value;
  
      // Utiliza la tasa de descuento por defecto si no se ha especificado otra
      if (tasaDescuento === null || tasaDescuento === undefined) {
        tasaDescuento = this.tasaDescuento;
      }
      // Convertir la fecha de inicio a un objeto Date
      this.fechaInicio = new Date(`${fechaInicio}T00:00:00`);
  
      // Calcular la fecha final sumando los días de descuento a la fecha de inicio
      this.fechaFinal = new Date(this.fechaInicio);
      this.fechaFinal.setDate(this.fechaFinal.getDate() + diasDescuento);
  
      // Inicializar variables
      let fechaActual = new Date(this.fechaInicio);
      this.descuentos = [];
      this.totalDescuento = 0;
      let diasRestantes = diasDescuento;
  
      // Iterar hasta llegar a la fecha final
      while (diasRestantes > 0) {
        const year = fechaActual.getFullYear();
        const month = fechaActual.getMonth();
        const diasEnMes = new Date(year, month + 1, 0).getDate();
        const diasRestantesEnMes = diasEnMes - fechaActual.getDate() + 1;
  
        // Calcular días a descontar
        const diasDescontar = Math.min(diasRestantesEnMes, diasRestantes);
  
        const montoDescuento = (diasDescontar * canonMensual / diasEnMes) * (tasaDescuento / 100);
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
            montoDescuento
          });
        }
  
        // Avanzar la fecha actual al siguiente periodo
        fechaActual.setDate(fechaActual.getDate() + diasDescontar);
        diasRestantes -= diasDescontar; // Actualizar los días de descuento restantes
      }
    }
  }
  
  onInputChange() {
    this.tasaDescuento = this.form.value.tasaDescuento ?? this.tasaDescuento;
    this.mostrarValores();
    this.calcularDescuentos();
  }


  mostrarValores(){
    this.diasDescuento = this.form.value.diasDescuento
    this.canonMensual = this.form.value.canonMensual
  }
  

}
