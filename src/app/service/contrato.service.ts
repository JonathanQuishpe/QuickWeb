import { Injectable } from '@angular/core';
import { Contrato } from '../model/contrato';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../..//environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  URL = environment.API
  //URL = 'https://www.qckservice.com/servicios/public/api/';
  //URL = 'http://localhost:8000/api/';
  contrato: Contrato[];
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private httpClient: HttpClient, ) { }

  public guardar(contrato: Contrato) {
    return this.httpClient.post(this.URL + '/contrato', contrato, { headers: this.httpHeaders });
  }

  public lista(id) {
    return this.httpClient.get(this.URL + '/listado-contrato/' + id);
  }

  public calificar(datos) {
    return this.httpClient.post(this.URL + '/calificar', datos, { headers: this.httpHeaders });
  }

  public aprobar(id) {
    return this.httpClient.get(this.URL + '/proveedor-estado/' + id);
  }
  public cambiarEstado(datos) {
    return this.httpClient.post(this.URL + '/cambiar-estado', datos, { headers: this.httpHeaders });
  }
  public comentarios(id) {
    return this.httpClient.get(this.URL + '/comentarios/' + id);
  }
}
