import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedorService } from '../service/proveedor.service';
import { Categoria } from '../model/categoria';
import { CategoriaService } from '../service/categoria.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})

export class StartComponent implements OnInit {
  modalRef: BsModalRef;
  afiliacionForm: FormGroup;
  categorias: Categoria[];
  image: File;
  fd = new FormData();
  config: any;
  constructor(private router: Router,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private proveedorService: ProveedorService,
    private categoriaservice: CategoriaService,
  ) {

  }

  ngOnInit() {
    this.home();
    this.getCategorias();
    this.afiliacionForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      //direccion: ['', Validators.required],
      sector: ['', Validators.required],
      ciudad: ['', Validators.required],
      barrio: ['', Validators.required],
      celular: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      convencional: ['', [Validators.required, Validators.maxLength(7), Validators.minLength(7)]],
      correo: ['', [Validators.required, Validators.email]],
      categoria: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: ['', Validators.required],
      /*contrasena: ['', Validators.required],*/
    });
  }
  ngAfterContentInit() {

  }
  onSelected(id) {
    this.router.navigate(['/proveedor', id]);
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }));
    this.afiliacionForm.reset();
  }
  getCategorias() {
    this.categoriaservice.get().subscribe((data: Categoria[]) => {
      this.categorias = data;
    }, (error) => {
      console.log(error);
      alert('Ocurrio un error');
    });
  }

  imageSelected(event) {
    this.image = <File>event.target.files[0];
  }

  afiliarse() {
    if (this.afiliacionForm.invalid) {
      Swal.fire({
        title: 'Aviso!',
        text: 'Llene todos los campos del formulario.!',
        type: 'warning',
        showConfirmButton: true,
      });
      /*let celular = this.afiliacionForm.value.celular;
      if (celular.length !== 10) {
        Swal.fire({
          title: 'Aviso!',
          text: 'EL número de celular tiene una extensión no válida.!',
          type: 'warning',
          showConfirmButton: true,
        });
        return;
      }
      let convencional = this.afiliacionForm.value.convencional;
      if (convencional.length !== 7) {
        Swal.fire({
          title: 'Aviso!',
          text: 'EL número convencional tiene una extensión no válida.!',
          type: 'warning',
          showConfirmButton: true,
        });
        return;
      }*/
      /*if (this.image == null) {
        Swal.fire({
          title: 'Aviso!',
          text: 'Debe elegir un archivo.!',
          type: 'warning',
          showConfirmButton: true,
        });
        return;
      }*/
    } else if (this.image == null) {
      Swal.fire({
        title: 'Aviso!',
        text: 'Debe elegir un archivo.!',
        type: 'warning',
        showConfirmButton: true,
      });
      return;

    } else {
      this.fd.append('nombres', this.afiliacionForm.value.nombres);
      this.fd.append('apellidos', this.afiliacionForm.value.apellidos);
      this.fd.append('email', this.afiliacionForm.value.correo);
      this.fd.append('direccion', this.afiliacionForm.value.ciudad + '-' + this.afiliacionForm.value.sector + '-' + this.afiliacionForm.value.barrio);
      this.fd.append('ciudad', this.afiliacionForm.value.ciudad);
      this.fd.append('sector', this.afiliacionForm.value.sector);
      this.fd.append('barrio', this.afiliacionForm.value.barrio);
      this.fd.append('celular', this.afiliacionForm.value.celular);
      this.fd.append('convencional', this.afiliacionForm.value.convencional);
      this.fd.append('descripcion', this.afiliacionForm.value.descripcion);
      this.fd.append('imagen', this.image, this.image.name);
      this.fd.append('id_categoria', this.afiliacionForm.value.categoria);
      this.proveedorService.guardar(this.fd).subscribe(data => {
        if (data === 'fail') {
          Swal.fire({
            title: 'Aviso!',
            text: 'El correo ya se encuentra registrado',
            type: 'warning',
            showCancelButton: false,
          });
        } else {
          Swal.fire({
            title: 'Registrado!',
            text: 'Su proceso de afiliacion se ha realizado de manera correcta. Espere el mensaje de confirmaciòn',
            type: 'success',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 4000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 3500);
        }

      });

    }
  }

  home() {
    this.categoriaservice.configuraciones().subscribe((result) => {
      this.config = result;
    }, (error) => {
      console.log(error);
      alert('Ocurrio un error');
    });
  }
}
