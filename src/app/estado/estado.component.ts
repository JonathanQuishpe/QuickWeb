import { Component, OnInit, TemplateRef } from '@angular/core';
import { ContratoService } from '../service/contrato.service';
import { Prueba } from '../model/prueba';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { PageEvent } from '@angular/material';
import { environment } from '../../environments/environment';
interface Ciudad {
  value: string;
  texto: string;
}
@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {
  SRC = environment.PERFIL;
  id = localStorage.getItem('identificador');
  lista: any = [];
  size: any;
  modalRef: BsModalRef;
  id_contrato = 0;
  calificacion = 0;
  calificarForm: FormGroup;
  lat = 0;
  lon = 0;
  referencia: any;
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
  ) { }

  ngOnInit() {
    this.calificarForm = this.formBuilder.group({
      valor: ['', Validators.required],
      id_contrato: ['', Validators.required],
      comentario: ['', Validators.required],
    });
    this.getLista();
  }

  getLista() {
    this.contratoService.lista(this.id).subscribe((data: any[]) => {
      console.log(data);
      this.lista = data;
      this.size = this.lista.length;
      this.separar_array(data);
      //console.log(data);
    }, (error) => {
      console.log(error);
      alert('Ocurrio un error');
    });
  }

  estrellas(number) {
    var items: number[] = [];
    for (var i = 0; i < number; i++) {
      items.push(i);
    }
    return items;
  }

  openModal(template: TemplateRef<any>, id_contrato: number) {
    this.calificarForm.reset();
    let obj = this.lista.find(obj => obj.id_contrato == id_contrato);
    this.lat = this.separar(obj.direccion, 0);
    this.lon = this.separar(obj.direccion, 1);
    this.referencia = obj.referencia;
    this.objDetalles = obj;
    console.log(obj);
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    this.id_contrato = id_contrato
  }

  valor(valor) {
    this.calificacion = valor;
    this.setValues();
  }

  guardarCalificacion() {
    this.loading();
    if (this.calificarForm.invalid) {
      Swal.fire({
        type: 'warning',
        title: 'Aviso',
        text: 'Ingrese una calificación y comentario al servicio !',
      })
    } else {
      this.contratoService.calificar(this.calificarForm.value).subscribe((data) => {
        Swal.fire({
          title: 'Aviso',
          text: "Calificación de servicio ingresado !",
          type: 'success',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
        (error) => {
          console.log(error);
        });
    }
  }

  setValues() {
    this.calificarForm.setValue({
      valor: this.calificacion,
      id_contrato: this.id_contrato,
      comentario: ''
    });
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
  separar(direccion, numero) {
    var array = direccion.split(';');
    return Number(array[numero]);
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
