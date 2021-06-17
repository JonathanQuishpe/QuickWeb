import { Component, OnInit, ViewChild, ElementRef, NgZone, TemplateRef } from '@angular/core';
import { Categoria } from '../model/categoria';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CategoriaService } from '../service/categoria.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedorService } from '../service/proveedor.service';
import { ContratoService } from '../service/contrato.service';
import { Prueba } from '../model/prueba';
import { Contrato } from '../model/contrato';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Proveedor } from '../model/proveedor';
//import { * } from 'googlemaps';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { environment } from '../../environments/environment';
declare const google: any;
@Component({
  selector: 'app-contratar',
  templateUrl: './contratar.component.html',
  styleUrls: ['./contratar.component.css']
})
export class ContratarComponent implements OnInit {
  SRC = environment.SRC;
  fecha: any;
  lat: number;
  lng: number;
  zoom: number;
  address: string;
  direccion: string;
  modalRef: BsModalRef;
  private geoCoder;
  //categorias: Categoria[];
  contrato: Contrato;
  contratarForm: FormGroup;
  //pro: Prueba[];
  id = localStorage.getItem('identificador');
  idProveedor: any;
  categoria_id: any;
  proveedor_id: any;
  size: number;
  enviar = false;
  proveedor: any;
  max_hora: any;
  min_hora: any;
  max_min: any;
  comentarios: any;
  @ViewChild('search', { static: false }) searchElementRef: ElementRef;
  @ViewChild('referencia', { static: false }) refencia: ElementRef;
  constructor(private categoriaservice: CategoriaService,
    private formBuilder: FormBuilder,
    private provedorService: ProveedorService,
    private contratoService: ContratoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private modalService: BsModalService,

  ) { }
  ngOnInit() {
    this.idProveedor = this.activatedRoute.snapshot.params['id'];
    if (this.idProveedor) {
      this.proveedorIngresar(this.idProveedor);
    }
    this.fecha = new Date();
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 15;
        });
      });
    });
    this.contratarForm = this.formBuilder.group({
      descripcion: ['', Validators.required],
      forma: ['', Validators.required],
      convencional: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
      telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      minutos: ['', Validators.required],
    });
    this.fecha = new Date();
  }

  crearMarcador(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }

  onSelected(categoria) {
    this.router.navigate(['/proveedor', categoria.id_categoria]);
  }
  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    this.getAddress(this.lat, this.lng);
  }
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  guardar() {
    this.loading();
    if (this.contratarForm.invalid) {
      Swal.fire({
        title: 'Aviso',
        text: "Llene todos los campos del formulario !",
        type: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'ACEPTAR'
      });
    } else if (this.refencia.nativeElement.value === '') {
      Swal.fire({
        title: 'Aviso',
        text: "Llene el campo referencia !",
        type: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'ACEPTAR'
      });
    } else {
      if (this.validaciones()) {
        this.direccion = this.lat.toString() + ';' + this.lng.toString();
        this.contrato = {
          nombre: '',
          direccion: this.direccion,
          telefono: this.contratarForm.value.telefono,
          convencional: this.contratarForm.value.convencional,
          descripcion: this.contratarForm.value.descripcion,
          categoria: Number(this.categoria_id),
          proveedor: Number(this.proveedor_id),
          usuario: Number(this.id),
          fecha: this.contratarForm.value.fecha,
          hora: this.contratarForm.value.hora,
          minutos: this.contratarForm.value.minutos,
          forma: this.contratarForm.value.forma,
          estado: 'Enviado',
          referencia: this.refencia.nativeElement.value
        };
        this.contratoService.guardar(this.contrato).subscribe((data) => {
          Swal.fire({
            title: 'Aviso',
            text: "Contrataciòn de servicio ingresado !",
            type: 'success',
            showConfirmButton: false,
            timer: 1000,
          });
          setTimeout(() => {
            this.router.navigateByUrl('/home');
          }, 800);
        },
          (error) => {
            Swal.fire({
              title: 'Aviso',
              text: "Problemas internos intente mas tarde.",
              type: 'warning',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'ACEPTAR'
            });
          });
      }
    }
  }

  proveedorIngresar(id) {
    this.provedorService.datosContrato(id).subscribe((data: any) => {
      this.allcoments(id);
      this.proveedor = data;
      //console.log(data);
      this.proveedor_id = data[0].id_proveedor;
      this.categoria_id = data[0].id_categoria;
      this.horas(data[0].hora_min, data[0].hora_max);
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

  horas(inicio, fin) {
    var hora = inicio.split(':');
    var hora2 = fin.split(':');
    this.min_hora = hora[0];
    this.max_hora = hora2[0];
    if (Number(hora[1]) > Number(hora2[1])) {
      this.max_min = hora[1];
    } else {
      this.max_min = hora[1];
    }
    this.contratarForm.get('hora').setValidators([Validators.min(this.min_hora), Validators.max(this.max_hora), Validators.required]);
    this.contratarForm.get('minutos').setValidators([Validators.min(0), Validators.max(59), Validators.required]);
  }

  validaciones() {
    var retorno = true;
    this.size = (this.contratarForm.value.telefono).length;
    if (this.size < 10 || this.size > 10) {
      Swal.fire({
        title: 'Aviso',
        text: "Número de celular incorrecto !",
        type: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'ACEPTAR'
      });
      return false;
    }
    this.size = (this.contratarForm.value.convencional).length;
    if (this.size < 7 || this.size > 7) {
      Swal.fire({
        title: 'Aviso',
        text: "Número de teléfono convencional incorrecto !",
        type: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'ACEPTAR'
      });
      return false;
    }
    this.size = this.contratarForm.value.hora;
    if (this.size < this.min_hora || this.size > this.max_hora) {
      Swal.fire({
        title: 'Aviso',
        text: "La hora no cumple con el rango indicado!",
        type: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'ACEPTAR'
      });
      return false;
    }
    /*this.size = this.contratarForm.value.minutos;
    if (this.size > this.max_min) {
      Swal.fire({
        title: 'Aviso',
        text: "Los minutos no cumplen con el rango indicado!",
        type: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'ACEPTAR'
      });
      return false;
    }*/


    return retorno;
  }

  allcoments(id) {
    this.contratoService.comentarios(id).subscribe((data: any) => {
      this.comentarios = data;
    }, (error) => {
      console.log(error);
      alert('Ocurrio un error');
    });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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
