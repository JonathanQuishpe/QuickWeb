import { Injectable } from '@angular/core';
import { Administracion } from '../model/administracion';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../..//environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdministracionService {
  URL = environment.API
  //URL = 'https://www.qckservice.com/servicios/public/api/';
  //URL = 'http://localhost:8000/api/';
  usuario: Administracion[];
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private httpClient: HttpClient, ) { }

  public login(userInfo: Administracion) {
    return this.httpClient.post(this.URL + '/administracion/login', userInfo, { headers: this.httpHeaders });
  }

  public acceso(): boolean {
    return (localStorage.getItem('acceso') != null) ? true : false;

  }

  public storage(usr: Administracion[]) {
    localStorage.setItem('acceso', usr[0].usuario);
  }

  public cerrar() {
    localStorage.removeItem('acceso');
  }
}
