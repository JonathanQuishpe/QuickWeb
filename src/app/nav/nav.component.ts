import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { ProveedorService } from '../service/proveedor.service';
import Swal from 'sweetalert2'
import { Categoria } from '../model/categoria';
import { CategoriaService } from '../service/categoria.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  fd = new FormData();
  image: File;
  modalRef: BsModalRef;
  isSubmitted = false;
  sesion = localStorage.getItem('ACCESS_TOKEN');
  name = localStorage.getItem('user');
  user: User[];
  size;
  categorias: Categoria[];
  id = localStorage.getItem('identificador');
  n_servicios = 0;
  n_contratos = 0;
  proveedor = localStorage.getItem('proveedor');
  rol = Number(localStorage.getItem('rol'));
  results: any = [];
  queryField: FormControl = new FormControl();
  ruta: any;
  constructor(private modalService: BsModalService,
    private authService: AuthService,
    private httpClient: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private proveedorService: ProveedorService,
    private categoriaservice: CategoriaService,
    private toastr: ToastrService) {
  }

  ngOnInit() {

    this.queryField.valueChanges.subscribe(
      string => {
        if (string !== '') {
          this.categoriaservice.busqueda(string).subscribe(
            data => {
              this.results = data;
            }
          );
        } else {
          this.results = [];
        }
      }
    );
    this.getCategorias();
    this.numero_servicios();
    this.numero_contratos();
    let x = setInterval(() => {
      this.numero_servicios();
      this.numero_contratos();
      //console.log('entro');
    }, 60000);
  }
  ngDoCheck() {
    var array = this.router.url.split('#');
    this.ruta = array[0];
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/landscape');
  }
  imageSelected(event) {
    this.image = <File>event.target.files[0];
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
    this.router.navigate(['/proveedor', categoria]);
  }

  numero_servicios() {
    var sesion = localStorage.getItem('ACCESS_TOKEN');
    if (sesion != null) {
      this.categoriaservice.numero_servicios(this.id).subscribe((data: any) => {
        this.n_servicios = data;
        /*if (data > 0) {
          this.toastr.info('Revise el estado de sus servicios', 'Aviso', { timeOut: 3000 })
        }*/
      }, (error) => {
        console.log(error);
      });
    }
  }
  numero_contratos() {
    var sesion = localStorage.getItem('ACCESS_TOKEN');
    if (sesion != null && this.rol == 2) {
      this.categoriaservice.numero_contratos(this.proveedor).subscribe((data: any) => {
        this.n_contratos = data;
        /*if (data > 0) {
          this.toastr.warning('Revise el estado de sus contratos', 'Aviso', { timeOut: 3000 })
        }*/
      }, (error) => {
        console.log(error);
      });
    }
  }
  buscador(result) {
    this.router.navigate(['/proveedor', result.id]);
    this.results = [];
  }
}
