import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../service/categoria.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-admin-config',
  templateUrl: './admin-config.component.html',
  styleUrls: ['./admin-config.component.css']
})
export class AdminConfigComponent implements OnInit {
  configuraciones: any;
  configForm: FormGroup;
  constructor(
    private categoriaservice: CategoriaService,
    private formBuilder: FormBuilder,
  ) {
    this.configForm = this.formBuilder.group({
      app_android: [''],
      app_store: [''],
      titulo: [''],
      sub_titulo_1: [''],
      sub_titulo_2: [''],
      parrafo: [''],
    });
  }

  ngOnInit() {
    this.data();
  }

  data() {
    this.categoriaservice.configuraciones().subscribe(result => {
      this.configuraciones = result;
    })
  }

  guardar() {
    if (this.configForm.valid) {
      this.loading();
      this.categoriaservice.actualizar_configuraciones(this.configForm.value).subscribe((data) => {
        Swal.fire({
          title: 'Aviso',
          text: "Datos actualizados!",
          type: 'success',
        });
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
