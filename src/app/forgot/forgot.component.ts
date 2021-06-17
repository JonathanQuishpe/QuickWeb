import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from '../service/usuario.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  forgotForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private usuario: UsuarioService
  ) {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
  }

  guardar() {
    if (this.forgotForm.valid) {
      this.loading();
      this.usuario.reestablecer(this.forgotForm.value).subscribe((result: any) => {
        if (result.status === 'success') {
          Swal.fire({
            type: 'success',
            title: 'Aviso',
            text: result.message,
          });
        } else {
          Swal.fire({
            type: 'warning',
            title: 'Aviso',
            text: result.message,
          });
        }
      }, (error) => {
        Swal.fire({
          type: 'warning',
          title: 'Aviso',
          text: 'Servicio no disponible, intente mas tarde.',
        });
      });
    } else {
      Swal.fire({
        type: 'warning',
        title: 'Aviso',
        text: 'Debe llenar todos los campos del formulario.',
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
