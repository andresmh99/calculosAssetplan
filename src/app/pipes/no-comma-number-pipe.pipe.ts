import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noCommaNumberPipe',
  standalone: true
})
export class NoCommaNumberPipePipe implements PipeTransform {

  transform(value: number): string {
    // Redondear el número a un entero
    const roundedValue = Math.round(value);
    // Convertir el número a una cadena y eliminar los separadores de miles
    return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '');
  }

}
