import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { environment } from '../..//environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  API_END = environment.API
  //API_END = 'https://www.qckservice.com/servicios/public/api';
  //API_END = 'http://localhost:8000/api';
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private httpClient: HttpClient) { }

  datos(id) {
    return this.httpClient.get(this.API_END + '/datos/' + id);
  }

  update(usr) {
    return this.httpClient.post(this.API_END + '/userUpdate', usr);
  }
  foto(usr) {
    return this.httpClient.post(this.API_END + '/foto', usr);
  }

  cuenta() {
    return this.httpClient.get(this.API_END + '/usuario/cuentas');
  }
  cuentaDisponibles() {
    return this.httpClient.get(this.API_END + '/usuario/cuentas-asignar');
  }
  proveedorDisponibles() {
    return this.httpClient.get(this.API_END + '/cuentas');
  }
  asignar(id: number, pro: number) {
    return this.httpClient.get(this.API_END + '/cuentas/asignar/' + id + '/' + pro);
  }
  token(user) {
    return this.httpClient.post(this.API_END + '/token/web', user);
  }

  reestablecer(user) {
    return this.httpClient.post(this.API_END + '/user/reestablecer', user, { headers: this.httpHeaders });
  }
}
