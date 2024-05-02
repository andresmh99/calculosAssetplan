

export interface cupon {
  tipoCupon: tipoCupon[];
  fecha: Date;
  descripcion: string;
  monto:number;
  descuento:number;
  total: number;
  valorDia: number;
}

export interface tipoCupon {
  nombreTipo: string;
}
