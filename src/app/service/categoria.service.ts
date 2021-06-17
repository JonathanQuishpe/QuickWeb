import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categoria } from '../model/categoria';
import { environment } from '../..//environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  API_END = environment.API
  //API_END = 'http://localhost:8000/api';
  //API_END = 'https://www.qckservice.com/servicios/public/api';
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private httpClient: HttpClient) { }
  get() {
    return this.httpClient.get(this.API_END + '/category');
  }

  guardar(categoria: Categoria) {
    return this.httpClient.post(this.API_END + '/categoria/guardar', categoria, { headers: this.httpHeaders });
  }

  actualizar(categoria: Categoria) {
    return this.httpClient.post(this.API_END + '/categoria/actualizar', categoria, { headers: this.httpHeaders });
  }

  borrar(id: number) {
    return this.httpClient.get(this.API_END + '/categoria/borrar/' + id);
  }

  numero_servicios(id) {
    return this.httpClient.get(this.API_END + '/numero/servicios/' + id);
  }
  numero_contratos(id) {
    return this.httpClient.get(this.API_END + '/numero/contratos/' + id);
  }
  busqueda(string) {
    return this.httpClient.get(this.API_END + '/busqueda/' + string);
  }
  contar(id) {
    return this.httpClient.get(this.API_END + '/categoria/contar/' + id);
  }

  configuraciones() {
    return this.httpClient.get(this.API_END + '/configuraciones');
  }

  actualizar_configuraciones(conf) {
    return this.httpClient.post(this.API_END + '/configuraciones', conf, { headers: this.httpHeaders });
  }


}
