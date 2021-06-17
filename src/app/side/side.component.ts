import { Component, OnInit } from '@angular/core';
import { Categoria } from '../model/categoria';
import { CategoriaService } from '../service/categoria.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {
  sesion = localStorage.getItem('ACCESS_TOKEN');
  proveedor = localStorage.getItem('proveedor');
  rol = Number(localStorage.getItem('rol'));
  categorias: Categoria[];
  id = localStorage.getItem('identificador');
  n_servicios = 0;
  n_contratos = 0;
  constructor(private categoriaservice: CategoriaService,
    private router: Router) {
    this.getCategorias();
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    /*this.numero_servicios();
    this.numero_contratos();
    let x = setInterval(() => {
      this.numero_servicios();
      this.numero_contratos();
      //console.log('entro');
    }, 30000);*/
  }

  numero_servicios() {
    this.categoriaservice.numero_servicios(this.id).subscribe((data: any) => {
      this.n_servicios = data;
    }, (error) => {
      console.log(error);
    });
  }
  numero_contratos() {
    this.categoriaservice.numero_contratos(this.proveedor).subscribe((data: any) => {
      this.n_contratos = data;
    }, (error) => {
      console.log(error);
    });
  }
  getCategorias() {
    this.categoriaservice.get().subscribe((data: Categoria[]) => {
      this.categorias = data;
    }, (error) => {
      console.log(error);
      alert('Ocurrio un error');
    });
  }

  onSelected(categoria) {
    this.router.navigate(['/proveedor', categoria.id]);
  }

}
