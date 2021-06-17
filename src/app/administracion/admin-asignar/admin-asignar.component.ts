import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { User } from '../../model/user';
import { Proveedor } from '../../model/proveedor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../../service/categoria.service';
import { Categoria } from '../../model/categoria';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-admin-asignar',
  templateUrl: './admin-asignar.component.html',
  styleUrls: ['./admin-asignar.component.css']
})
export class AdminAsignarComponent implements OnInit {
  cuentas: User[];
  proveedor: Proveedor[];
  cuentasDisponibles: Categoria[];
  asignarForm: FormGroup;

  constructor(private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private categoriaservice: CategoriaService,
  ) { }

  ngOnInit() {
    this.asignarForm = this.formBuilder.group({
      id: ['', Validators.required],
      pro: ['', Validators.required],
    });
    this.lista();
    this.getCuentas();
    this.getProveedor();
  }

  lista() {
    this.usuarioService.cuenta().subscribe((data: User[]) => {
      this.cuentas = data;
      console.log(data);
    }, (error) => {
      console.log(error);
      alert('Ocurrio un error');
    });
  }
  getCuentas() {
    this.categoriaservice.get().subscribe((data: Categoria[]) => {
      this.cuentasDisponibles = data;
      //console.log(this.cuentasDisponibles);
    }, (error) => {
      console.log(error);
      alert('Ocurrio un error');
    });
  }
  getProveedor() {
    this.usuarioService.proveedorDisponibles().subscribe((data: Proveedor[]) => {
      this.proveedor = data;
    }, (error) => {
      console.log(error);
      alert('Ocurrio un error');
    });
  }

  guardar() {
    this.loading();
    if (!this.asignarForm.invalid) {
      var id = this.asignarForm.value.pro; //CATEGORIA
      var pro = this.asignarForm.value.id; //PROVEEDOR
      this.usuarioService.asignar(id, pro).subscribe((data) => {
        Swal.fire({
          title: 'Aviso',
          text: "Categería asignada con éxito!",
          type: 'success',
          showConfirmButton: false,
          timer: 700,
        });
        setTimeout(() => {
          window.location.reload();
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
    } else {
      Swal.fire({
        title: 'Aviso',
        text: "Debe llenar todos los campos",
        type: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'ACEPTAR'
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
