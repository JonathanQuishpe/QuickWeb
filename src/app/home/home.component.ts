import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UsuarioService } from '../service/usuario.service';
import { ProveedorService } from '../service/proveedor.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../model/user';
import { Categoria } from '../model/categoria';
import { CategoriaService } from '../service/categoria.service';
import { MessagingService } from '../service/messaging.service';
import Swal from 'sweetalert2'
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  SRC = environment.PERFIL;
  image: File;
  fd = new FormData();
  fduser = new FormData();
  userForm: FormGroup;
  //separar informacion
  proveedorForm: FormGroup;
  infoForm: FormGroup;
  lista: any;
  idUser = localStorage.getItem('identificador');
  proveedor = Number(localStorage.getItem('proveedor'));
  categorias: Categoria[];
  profile: any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  registrationForm: FormGroup;
  showForm = 'none';
  showData = 'none';
  formulario;
  constructor(private authService: AuthService,
    private router: Router,
    private usuarioService: UsuarioService,
    private proveedorService: ProveedorService,
    private formBuilder: FormBuilder,
    private categoriaservice: CategoriaService,
    private message: MessagingService,
  ) {
    this.userForm = this.formBuilder.group({
      names: ['', Validators.required],
      lastnames: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      user: ['', Validators.required],
      password: ['', Validators.required],
      id: ['', Validators.required],
      //imagen: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.message.receiveMessage();
    this.registrationForm = new FormGroup({
      'infoPro': new FormGroup({
        'alias': new FormControl(null, Validators.required),
        'descripcion': new FormControl(null, Validators.required),
        'convencional': new FormControl(null, Validators.required),
        'celular': new FormControl(null, Validators.required),
        'id': new FormControl(null, Validators.required),
        'imagen': new FormControl(null, Validators.required),
      }),
      'inforPago': new FormGroup({
        'hora_min': new FormControl(null, Validators.required),
        'hora_max': new FormControl(null, Validators.required),
        'precio_min': new FormControl(null, Validators.required),
        'precio_max': new FormControl(null, Validators.required),
        'banco': new FormControl(null, Validators.required),
        'cuenta': new FormControl(null, Validators.required),
      })
    });
    this.getCategorias();
    this.datos()
    if (this.proveedor > 0) {
      this.datosProveedor();
    }
  }


  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/start');
  }

  imageSelected(event) {
    var image = <File>event.target.files[0];
    if (this.validateFile(image.name)) {
      this.image = image;
    } else {
      //this.userForm.controls['imagen'].setValue(null);
      this.registrationForm.patchValue({
        infoPro: {
          imagen: null,
        },
      });
      Swal.fire({
        title: 'Aviso',
        text: "El formato de la imagen es inválido !",
        type: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'ACEPTAR'
      });
    }
    /*console.log(this.image);*/
    /*this.image = <File>event.target.files[0];*/

  }

  async datos() {
    this.usuarioService.datos(this.idUser).subscribe((data: User) => {
      console.log(data);
      if (data.imagen === 'S/N') {
        this.profile = 'default.png';
      } else {
        this.profile = data.imagen;
      }
      this.userForm.controls['names'].setValue(data.names);
      this.userForm.controls['lastnames'].setValue(data.lastnames);
      this.userForm.controls['email'].setValue(data.email);
      this.userForm.controls['user'].setValue(data.user);
      this.userForm.controls['password'].setValue(data.pass);
      this.userForm.controls['id'].setValue(data.id);

    }, (error) => {
      console.log(error);
      alert('Ocurrio un error');
    });
  }

  save() {
    this.loading();
    if (this.userForm.invalid) {
      Swal.fire({
        title: 'Aviso',
        text: "Llene todos los campos del formulario !",
        type: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'ACEPTAR'
      });
    } else {
      //if (this.validateFile(this.image.name)) {
      this.fduser.append('names', this.userForm.value.names);
      this.fduser.append('lastnames', this.userForm.value.lastnames);
      this.fduser.append('email', this.userForm.value.email);
      this.fduser.append('user', this.userForm.value.user);
      this.fduser.append('password', this.userForm.value.password);
      this.fduser.append('id', this.userForm.value.id);
      this.usuarioService.update(this.fduser).subscribe((data) => {
        localStorage.setItem('user', this.userForm.value.user);
        Swal.fire({
          title: 'Aviso',
          text: "Datos actualizados con éxito !",
          type: 'success',
          showConfirmButton: false,
          timer: 1000,
        });
        //this.datos();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      },
        (error) => {
          console.log(error);
        });

      /*} else {
        Swal.fire({
          title: 'Aviso',
          text: "El formato de la imagen no es permitido!",
          type: 'warning',
          showConfirmButton: true,
        });
      }*/

    }
  }

  datosProveedor() {
    this.proveedorService.listado_categorias(this.proveedor).subscribe(data => {
      this.lista = data;
      //console.log(this.lista);
    });
  }

  saveProveedor(enviar) {
    this.loading();
    if (!enviar) {
      Swal.fire({
        title: 'Aviso',
        text: "Llene todos los campos del formulario !",
        type: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'ACEPTAR'
      });
    } else {
      /*console.log(this.registrationForm.get('infoPro').get('id').value);
      return;*/
      if (this.validateFile(this.image.name)) {
        this.fd.append('nombres', this.registrationForm.get('infoPro').get('alias').value);
        this.fd.append('descripcion', this.registrationForm.get('infoPro').get('descripcion').value);
        this.fd.append('celular', this.registrationForm.get('infoPro').get('celular').value);
        this.fd.append('convencional', this.registrationForm.get('infoPro').get('convencional').value);
        this.fd.append('precio_min', this.registrationForm.get('inforPago').get('precio_min').value);
        this.fd.append('precio_max', this.registrationForm.get('inforPago').get('precio_max').value);
        this.fd.append('banco', this.registrationForm.get('inforPago').get('banco').value);
        this.fd.append('cuenta', this.registrationForm.get('inforPago').get('cuenta').value);
        this.fd.append('h_in', this.registrationForm.get('inforPago').get('hora_min').value);
        this.fd.append('h_out', this.registrationForm.get('inforPago').get('hora_max').value);
        this.fd.append('id', this.registrationForm.get('infoPro').get('id').value);
        this.fd.append('imagen', this.image, this.image.name);
        //console.log(this.proveedorForm.value);
        this.proveedorService.actualizar(this.fd).subscribe(data => {
          Swal.fire({
            title: 'Aviso',
            text: "Datos actualizados con éxito !",
            type: 'success',
            showConfirmButton: false,
            timer: 1000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 100);
        },
          (error) => {
            Swal.fire({
              title: 'Aviso',
              text: "Problemas en el servidor intente mas tarde !",
              type: 'success',
              showConfirmButton: false,
            });
          });
      } else {
        Swal.fire({
          title: 'Aviso',
          text: "El formato de la imagen no es permitido!",
          type: 'warning',
          showConfirmButton: true,
        });
      }
    }
  }

  cargar(id) {
    if (id > 0) {
      this.proveedorService.item(id).subscribe((data: any) => {
        //console.log(data);
        this.formulario = data;
        this.registrationForm.setValue({
          infoPro: {
            alias: data[0].alias,
            descripcion: data[0].descripcion,
            celular: data[0].celular,
            convencional: data[0].convencional,
            id: data[0].id,
            imagen: '',
          },
          inforPago: {
            hora_min: data[0].hora_min,
            hora_max: data[0].hora_max,
            precio_min: data[0].precio_min,
            precio_max: data[0].precio_max,
            banco: data[0].banco,
            cuenta: data[0].cuenta
          }
        })
      });
      this.showData = 'block';
      this.showForm = 'none';
    } else {
      this.registrationForm.reset();
      this.showData = 'none';
      this.showForm = 'none';
    }
  }
  getCategorias() {
    this.categoriaservice.get().subscribe((data: Categoria[]) => {
      this.categorias = data;
    }, (error) => {
      console.log(error);
      alert('Ocurrio un error');
    });
  }

  onSelected(categoria) {
    this.router.navigate(['/proveedor', categoria.id]);
  }

  editar() {
    this.showForm = 'block';
    this.showData = 'none';
  }
  cancelar() {
    this.showForm = 'none';
    this.showData = 'block';
  }
  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() === 'png' || ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'jpeg') {
      return true;
    }
    else {
      return false;
    }
  }

  upload() {
    this.loading();
    if (this.image == null) {
      Swal.fire({
        title: 'Aviso',
        text: "Debe elegir una imagen!",
        type: 'warning',
        showConfirmButton: true,
      });
    } else {
      if (this.validateFile(this.image.name)) {
        console.log(this.image.name);
        var form = new FormData();
        form.append('id', this.idUser);
        form.append('imagen', this.image, this.image.name);
        this.usuarioService.foto(form).subscribe(result => {
          if (result === 'ok') {
            Swal.fire({
              title: 'Aviso',
              text: "Foto actualizada con éxito !",
              type: 'success',
              showConfirmButton: false,
              timer: 1000,
            });
            setTimeout(() => {
              window.location.reload();
            }, 100);
          } else {
            Swal.fire({
              title: 'Aviso',
              text: "Intente mas tarde!",
              type: 'warning',
              showConfirmButton: true,
            });
          }
        });
      } else {
        Swal.fire({
          title: 'Aviso',
          text: "El formato de la imagen no es permitido!",
          type: 'warning',
          showConfirmButton: true,
        });
      }
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
