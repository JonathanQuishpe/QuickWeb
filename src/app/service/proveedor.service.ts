import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Proveedor } from '../model/proveedor';
import { environment } from '../..//environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  API_END = environment.API
  //API_END = 'https://www.qckservice.com/servicios/public/api';;
  //API_END = 'http://localhost:8000/api';
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private httpClient: HttpClient) { }

  get(id) {
    return this.httpClient.get(this.API_END + '/proveedor/' + id);
  }

  proveedorCompra(id) {
    return this.httpClient.get(this.API_END + '/proveedor-contrato/' + id);
  }

  datos(id) {
    return this.httpClient.get(this.API_END + '/datos-proveedor/' + id);
  }
  datosContrato(id) {
    return this.httpClient.get(this.API_END + '/datos-contrato/' + id);
  }

  actualizar(proveedor) {
    return this.httpClient.post(this.API_END + '/proveedor/actualizar', proveedor);
  }

  lista() {
    return this.httpClient.get(this.API_END + '/lista');
  }
  pendientes() {
    return this.httpClient.get(this.API_END + '/pendientes');
  }
  pendientes_datos(id: number) {
    return this.httpClient.get(this.API_END + '/pendientes_datos/' + id);
  }


  guardar(proveedor) {
    return this.httpClient.post(this.API_END + '/proveedor/guardar', proveedor);
  }
  activar_proveedor(proveedor) {
    return this.httpClient.post(this.API_END + '/proveedor/activar', proveedor);
  }


  borrar(id: number) {
    return this.httpClient.get(this.API_END + '/proveedor/borrar/' + id);
  }

  activar(id: number) {
    return this.httpClient.get(this.API_END + '/proveedor/activar/' + id);
  }

  listado_categorias(id: number) {
    return this.httpClient.get(this.API_END + '/listado_categorias/' + id);
  }

  item(id: number) {
    return this.httpClient.get(this.API_END + '/item/' + id);
  }

}
