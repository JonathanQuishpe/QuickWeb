import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../..//environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL = environment.API
  //URL = 'https://www.qckservice.com/servicios/public/api/';
  //URL = 'http://localhost:8000/api/';
  usuario: User[];
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  size;
  constructor(private httpClient: HttpClient, ) { }

  public auth(userInfo: User) {
    return this.httpClient.post(this.URL + '/login', userInfo, { headers: this.httpHeaders });
    /*console.log(userInfo);
    return localStorage.setItem('ACCESS_TOKEN', "access_token");*/
  }
  public storage(usr: User[]) {
    localStorage.setItem('ACCESS_TOKEN', 'XeW3j3v3ZRe1KIe5DcOmzgE4MGPxK23Rk7pXhuCAqZTyBswSyk');
    localStorage.setItem('user', usr[0].user);
    localStorage.setItem('identificador', usr[0].id.toString());
    localStorage.setItem('rol', usr[0].id_rol.toString());
    localStorage.setItem('proveedor', usr[0].id_proveedor.toString());
    //console.log(usr[0].id);
  }

  public isLoggedIn(): boolean {
    return (localStorage.getItem('ACCESS_TOKEN') != null) ? true : false;

  }
  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('user');
    localStorage.removeItem('identificador');
    localStorage.removeItem('rol');
    localStorage.removeItem('proveedor');
  }
  public register(usr: User) {
    return this.httpClient.post(this.URL + '/user', usr, { headers: this.httpHeaders });
  }

  public listaCategorias() {

  }
}
