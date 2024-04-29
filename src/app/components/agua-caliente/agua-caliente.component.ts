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
  selector: 'app-agua-caliente',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './agua-caliente.component.html',
  styleUrl: './agua-caliente.component.css',
})
export class AguaCalienteComponent {
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

  form = new FormGroup({
    id: new FormControl(''),
    ufContrato: new FormControl(),
    lecturaInicial: new FormControl(),
    lecturaFinal: new FormControl(),
  });

  constructor(private ufService: ApiService) {}

  ngOnInit(): void {
    this.obtenerValorUF();
    this.calcularPrecioMetroCubico();
    this.modificarValorContrato();
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
