import { Component, OnInit, TemplateRef } from '@angular/core';
import { ContratoService } from '../service/contrato.service';
import { Contrato } from '../model/contrato';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from "@angular/router";
import { PageEvent } from '@angular/material';
import { environment } from '../../environments/environment';
interface Ciudad {
  value: string;
  texto: string;
}
@Component({
  selector: 'app-aprobar',
  templateUrl: './aprobar.component.html',
  styleUrls: ['./aprobar.component.css']
})
export class AprobarComponent implements OnInit {
  SRC = environment.PERFIL;
  id = localStorage.getItem('proveedor');
  lista: Contrato[] = [];
  transito: Array<Contrato> = [];
  finalizado: Array<Contrato> = [];
  size: any;
  modalRef: BsModalRef;
  estadoForm: FormGroup;
  id_contrato: any;
  estado: string;
  lat = 0;
  lon = 0;
  referencia: any;
  estados: any[];
  showcomentario = false;
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
  objDetalles: any = [];
  constructor(private contratoService: ContratoService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.estadoForm = this.formBuilder.group({
      estado: ['', Validators.required],
      id_contrato: [''],
      comentario: [''],
    });
    this.getLista();
  }

  getLista() {
    this.contratoService.aprobar(this.id).subscribe((data: Contrato[]) => {
      //console.log(data);
      this.size = data.length;
      this.lista = data;
      this.separar_array(data);
    }, (error) => {
      console.log(error);
      alert('Ocurrio un error');
    });
  }
  openModal(template: TemplateRef<any>, id_contrato: number, name = '', estado = '') {
    console.log(name);
    this.id_contrato = id_contrato
    if (name === 'mapa' || name === 'detalles') {
      let obj = this.lista.find(obj => obj.id == id_contrato);
      this.objDetalles = obj;
      this.lat = this.separar(obj.direccion, 0);
      this.lon = this.separar(obj.direccion, 1);
      this.referencia = obj.referencia;
      this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    } else {
      let obj = this.lista.find(obj => obj.id == id_contrato);
      this.objDetalles = obj;
      this.estadoForm.reset();
      this.cargar_estados(estado);
      // console.log(obj);
      this.modalRef = this.modalService.show(template);
    }
  }
  openMap(id: number) {
  }
  cambiar() {
    this.loading();
    if (this.estadoForm.invalid) {
      Swal.fire({
        type: 'warning',
        title: 'Aviso',
        text: 'Eliga un estado para el servicio !',
      })
    } else {
      var c = 'S/N';
      switch (Number(this.estadoForm.value.estado)) {
        case 1:
          this.estado = 'Aprobado';
          break;
        case 2:
          this.estado = 'Rechazado';
          c = this.estadoForm.value.comentario;
          break;
        case 3:
          this.estado = 'Finalizado';
          break;
      }
      this.estadoForm.setValue({
        estado: this.estado,
        id_contrato: this.id_contrato,
        comentario: c
      });
      /*console.log(this.estadoForm.value.estado);
      console.log(this.estadoForm.value.id_contrato);
      console.log(this.estadoForm.value.comentario);
      return;*/
      this.contratoService.cambiarEstado(this.estadoForm.value).subscribe((data) => {
        Swal.fire({
          title: 'Aviso',
          text: "Estado cambiado con éxito !",
          type: 'success',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      },
        (error) => {
          console.log(error);
        });
    }
  }
  estrellas(number) {
    var items: number[] = [];
    for (var i = 0; i < number; i++) {
      items.push(i);
    }
    return items;
  }

  separar(direccion, numero) {
    var array = direccion.split(';');
    return Number(array[numero]);
  }

  cargar_estados(estado) {
    if (estado === 'Enviado') {
      this.estados = [
        { id: 1, nombre: 'Aprobar' },
        { id: 2, nombre: 'Rechazar' },
      ];
    } else {
      this.estados = [
        { id: 3, nombre: 'Finalizar' },
      ];
    }
  }
  //paginador
  pageEvent(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
    //console.log(this.lista.length);
  }
  //filtro
  filtroCiudad(ciudad) {
    this.textoBuscar = ciudad;
    this.columna = 'estado';
    //console.log(food);
  }
  separar_array(data) {
    this.ciudades = [
      { value: '0', texto: 'Todo' }
    ];
    data.forEach(element => {
      let val = element.estado.toLowerCase();
      let ciudad = { value: val, texto: element.estado };
      this.ciudades.push(ciudad);
      //console.log(element.id);
    });
    this.ciudades = this.removeDuplicates(this.ciudades, 'texto');

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

  show(val) {
    if (val == 2) {
      this.showcomentario = true;
    } else {
      this.showcomentario = false;
    }
  }

  loading() {
    Swal.fire({
      title: 'Cargando....',
      imageUrl: 'https://www.qckservice.com/servicios/public/icons/load.gif',
      imageWidth: 70,
      imageHeight: 65,
      imageAlt: 'Loading',
      showConfirmButton: false,
    });
  }

}
