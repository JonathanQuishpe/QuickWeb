import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProveedorCatego } from '../model/proveedorCategoria';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorService } from '../service/proveedor.service';
import Swal from 'sweetalert2'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from '../../environments/environment';
import { PageEvent } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
declare var hola: any;
interface Ciudad {
  value: string;
  texto: string;
}
@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
  barrioField: FormControl = new FormControl();
  ciudadField: FormControl = new FormControl();
  sectorField: FormControl = new FormControl();
  SRC = environment.SRC;
  sesion = localStorage.getItem('ACCESS_TOKEN');
  id: any;
  pro: ProveedorCatego[] = [];
  categoria: any;
  modalRef: BsModalRef;
  proveedor: any;
  //paginacion
  page_size = 3;
  page_number = 1;
  pageSizeOptions = [2, 5, 10, 20]

  //filtro
  textoBuscar = '';
  columna = '';
  ciudades: Ciudad[] = [
    /* { value: '0', texto: 'Todo' }*/
  ];
  sectores: Ciudad[] = [
    /*{ value: '0', texto: 'Todo' }*/
  ];
  barrios: Ciudad[] = [
    /*{ value: '0', texto: 'Todo' }*/
  ];
  ruta: any;
  constructor(
    private provedorService: ProveedorService,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private router: Router
  ) {
    activatedRoute.params.subscribe(val => this.ngOnInit())
  }
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    //this.categoria = this.activatedRoute.snapshot.params['nombre'];
    if (this.id) {
      this.getProCate(this.id);
      //this.categoria = this.pro[0].nombre;
    }
    this.ruta = this.router.url;
  }


  getProCate(id) {
    this.provedorService.get(id).subscribe((data: ProveedorCatego[]) => {
      this.pro = data;
      this.separar_array(data);
      if (data.length > 0) {
        if (this.ruta === '/proveedor/all') {
          this.categoria = 'Todas';
        } else {
          this.categoria = data[0].nombre;
        }
      } else {
        this.categoria = 'vacio'
      }
      //console.log(data);
    }, (error) => {
      //console.log(error);
      alert('Ocurrio un error');
    });
  }

  pintar(valor) {
    console.log(valor);
  }

  validar() {
    Swal.fire({
      title: 'Aviso!',
      text: 'Inicie sesion para contratar el servicio!',
      type: 'warning',
      showCancelButton: false,
    })
  }

  contratar(proveedor) {
    this.router.navigate(['/contratar', proveedor.id]);
  }

  estrellas(number) {
    var items: number[] = [];
    for (var i = 0; i < number; i++) {
      items.push(i);
    }
    return items;
  }

  openModal(template: TemplateRef<any>, proveedor) {
    this.provedorService.datosContrato(proveedor.id).subscribe((data: any) => {
      this.proveedor = data;
      console.log(this.proveedor);
    }, (error) => {
      console.log(error);
      alert('Ocurrio un error');
    });
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  //paginador
  pageEvent(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }

  //filtro
  filtroCiudad(ciudad) {
    this.textoBuscar = ciudad;
    this.columna = 'ciudad';
    //console.log(food);
  }
  filtroSector(sector) {
    this.textoBuscar = sector;
    this.columna = 'sector';
    //console.log(food);
  }
  filtroBarrio(barrio) {
    this.textoBuscar = barrio;
    this.columna = 'barrio';
    //console.log(food);
  }

  separar_array(data) {
    this.ciudades = [
      { value: '0', texto: 'Todo' }
    ];
    this.sectores = [
      { value: '0', texto: 'Todo' }
    ];
    this.barrios = [
      { value: '0', texto: 'Todo' }
    ];
    data.forEach(element => {
      let val = element.ciudad.toLowerCase();
      let val2 = element.sector.toLowerCase();
      let val3 = element.barrio.toLowerCase();
      let ciudad = { value: val, texto: element.ciudad };
      let sector = { value: val2, texto: element.sector };
      let barrio = { value: val3, texto: element.barrio };
      this.ciudades.push(ciudad);
      this.sectores.push(sector);
      this.barrios.push(barrio);
      //console.log(element.id);
    });
    this.ciudades = this.removeDuplicates(this.ciudades, 'texto');
    this.sectores = this.removeDuplicates(this.sectores, 'texto');
    this.barrios = this.removeDuplicates(this.barrios, 'texto');
  }

  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }

  borrar() {
    this.textoBuscar = '';
    this.barrioField = new FormControl('');
    this.sectorField = new FormControl('');
    this.ciudadField = new FormControl('');
  }
}
