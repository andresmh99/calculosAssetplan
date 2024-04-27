import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { environment } from '../../../environments/environment.development';
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
  valor: number = 0;
  ufContrato: number = 0.2;

  form = new FormGroup({
    id: new FormControl(''),
    ufContrato: new FormControl()
  });

  constructor(private ufService: ApiService) {}

  ngOnInit(): void {
    this.obtenerValorUF();
  }

  obtenerValorUF() {
    this.ufService.obtenerValorUF().subscribe((res) => {
      res.UFs.map((uf) => {
        this.valor = parseFloat(uf.Valor);
        this.fecha = uf.Fecha;
      });
    });
  }

  calcularAguaCaliente() {
    this.ufContrato = this.form.value.ufContrato
    console.log(this.ufContrato);
  }
}
