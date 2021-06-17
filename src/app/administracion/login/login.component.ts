import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Administracion } from '../../model/administracion';
import { AdministracionService } from '../../service/administracion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: Administracion[];
  constructor(private formBuilder: FormBuilder,
    private adminService: AdministracionService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      pass: ['', Validators.required]
    });
  }

  login() {
    if (!this.loginForm.invalid) {
      this.adminService.login(this.loginForm.value).subscribe((data: Administracion[]) => {
        if (data.length > 0) {
          this.user = data;
          this.adminService.storage(this.user);
          this.router.navigateByUrl('/administracion/menu');
        } else {
          Swal.fire({
            type: 'error',
            title: 'Lo siento',
            text: 'Usuario o contraseña incorrecta',
          })
        }
      });
    } else {
      Swal.fire({
        type: 'warning',
        title: 'Aviso',
        text: 'Debe llenar todos los campos',
      })
    }
  }
}
