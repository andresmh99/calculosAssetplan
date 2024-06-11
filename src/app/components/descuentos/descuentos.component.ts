import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-descuentos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './descuentos.component.html',
  styleUrl: './descuentos.component.css'
})
export class DescuentosComponent {
  contratoForm!: FormGroup;
  resultadoCalculo: any;
  fechaInicio: Date = new Date();
  diasPromocion: number = 0;
  porcentajePromocion: number = 0
  valorCupon: number = 0

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
      this.contratoForm = this.fb.group({
          fechaInicio: ['', Validators.required],
          diasPromocion: ['', [Validators.required, Validators.min(1)]],
          porcentajePromocion: ['', [Validators.required, Validators.min(1)]],
          valorCupon: ['', [Validators.required, Validators.min(1)]]
      });
  }

  calcularPromocion() {
      if (this.contratoForm.invalid) {
          alert('Por favor, complete todos los campos.');
          return;
      }

      // Obtener los valores del formulario
      const valores = this.contratoForm.value;
      this.fechaInicio = new Date(valores.fechaInicio);
      this.diasPromocion = valores.diasPromocion;
      this.porcentajePromocion = valores.porcentajePromocion;
      this.valorCupon = valores.valorCupon;

      const [anio, mes, dia] = valores.fechaInicio.split('-').map(Number);

      // Calcula la fecha de finalización de la promoción
      const fechaFinPromocion = new Date(anio, mes - 1, dia);
      fechaFinPromocion.setDate(this.fechaInicio.getDate() + this.diasPromocion);

      // Calcula el total de descuentos
      const totalDescuentos = (this.porcentajePromocion / 100) * this.valorCupon;

      // Calcula el valor por día de descuento
      const valorDiaDescuento = totalDescuentos / this.diasPromocion;

      // Calcula el detalle de descuentos por mes
      const detalleDescuentos = this.calcularDetalleDescuentos(this.fechaInicio, fechaFinPromocion, totalDescuentos);

      // Asigna los resultados
      this.resultadoCalculo = {
          fechaFinPromocion: fechaFinPromocion.toISOString().split('T')[0],
          totalDescuentos: totalDescuentos.toFixed(2),
          valorDiaDescuento: valorDiaDescuento.toFixed(2),
          detalleDescuentos: detalleDescuentos
      };

      console.log(detalleDescuentos);
  }

  calcularDetalleDescuentos(fechaInicio: Date, fechaFin: Date, totalDescuentos: number) {
      const detalle: { mes: string, descuento: number }[] = [];
      const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

      // Inicializa un objeto para almacenar el descuento por mes
      const descuentosPorMes: { [mes: string]: number } = {};
      meses.forEach(mes => {
          descuentosPorMes[mes] = 0;
      });

      // Itera sobre los días de la promoción
      let fechaActual = new Date(fechaInicio);
      while (fechaActual <= fechaFin) {
          const mesActual = meses[fechaActual.getMonth()];
          descuentosPorMes[mesActual] += totalDescuentos / this.contratoForm.value.diasPromocion;
          fechaActual.setDate(fechaActual.getDate() + 1);
      }

      // Convierte el objeto en un array de objetos para el detalle
      Object.keys(descuentosPorMes).forEach(mes => {
          detalle.push({ mes: mes, descuento: descuentosPorMes[mes] });
      });

      return detalle;
  }
}
