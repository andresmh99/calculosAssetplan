import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Iuf } from '../interfaces/Iuf';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public url:string;
  constructor(private http: HttpClient) {
    this.url = environment.URL
  }

  obtenerValorUF(){
    return this.http.get<Iuf>(`${environment.URL}`);
  }
}
