import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { User } from '../../model/user';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { MessagingService } from '../../service/messaging.service';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  user: User[];
  showPassowrd = false;
  passwordToggleIcon = 'visibility';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private message: MessagingService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.registerForm = this.formBuilder.group({
      names: ['', Validators.required],
      lastnames: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }
  login() {
    this.loading();
    if (this.loginForm.invalid) {
      Swal.fire({
        type: 'warning',
        title: 'Aviso',
        text: 'Debe llenar todos los campos del formulario.',
      });
    } else {
      this.authService.auth(this.loginForm.value).subscribe((data: User[]) => {
        if (data.length > 0) {
          Swal.close();
          this.user = data;
          this.authService.storage(this.user);
          this.message.requestPermission(data[0]);
          this.router.navigateByUrl('/home');
        } else {
          Swal.fire({
            type: 'error',
            title: 'Lo siento',
            text: 'Correo electrónico o contraseña incorrecta',
          });
        }
      });
    }
  }

  register() {
    this.loading();
    if (this.registerForm.invalid) {
      Swal.fire({
        type: 'warning',
        title: 'Aviso',
        text: 'Debe llenar todos los campos del formulario.',
      });
    } else {
      this.authService.register(this.registerForm.value).subscribe((data) => {
        if (data === 'fail') {
          Swal.fire({
            title: 'Aviso',
            text: "El correo electronico ya se encuentra registrado!",
            type: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
        } else {
          this.router.navigateByUrl('/landscape');
          Swal.fire({
            title: 'Bienvenido',
            text: "Usuario registrado con éxito !",
            type: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                'Aviso',
                'Inicie sesión con el correo electrónico registrado.',
                'info'
              );
            }
          });
        }
      },
        (error) => {
          console.log(error);
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

  togglePassoword() {
    this.showPassowrd = !this.showPassowrd;
    if (this.passwordToggleIcon == 'visibility') {
      this.passwordToggleIcon = 'visibility_off';
    } else {
      this.passwordToggleIcon = 'visibility';
    }
  }

}
