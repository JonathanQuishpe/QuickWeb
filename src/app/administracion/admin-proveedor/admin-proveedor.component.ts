import { Component, OnInit, ViewChild } from '@angular/core';
import { ProveedorService } from '../../service/proveedor.service';
import { Proveedor } from '../../model/proveedor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../model/categoria';
import { CategoriaService } from '../../service/categoria.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-admin-proveedor',
  templateUrl: './admin-proveedor.component.html',
  styleUrls: ['./admin-proveedor.component.css']
})
export class AdminProveedorComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  DOC = environment.DOC;
  proveedores: Proveedor[];
  pendientesLista: Proveedor[] = [];
  proveedorForm: FormGroup;
  categorias: Categoria[];
  data: any;
  descripcion: string;
  celular: string;
  displayedColumns: string[] = ['nombre', 'direccion', 'celular', 'descripcion', 'calificacion', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Proveedor>();
  constructor(private proveedorService: ProveedorService,
    private formBuilder: FormBuilder,
    private categoriaservice: CategoriaService,
    private router: Router, ) { }

  ngOnInit() {
    this.proveedorForm = this.formBuilder.group({
      id_proveedor: ['', Validators.required],
      id_categoria: ['', Validators.required],
    });
    this.lista();
    this.pendientes();
    this.getCategorias();
    this.dataSource.paginator = this.paginator;
  }

  lista() {
    this.proveedorService.lista().subscribe((data: Proveedor[]) => {
      this.proveedores = data;
      this.dataSource.data = data;
    }, (error) => {
      console.log(error);
      alert('Ocurrio un error');
    });
  }
  pendientes() {
    this.proveedorService.pendientes().subscribe((data: Proveedor[]) => {
      this.pendientesLista = data;
    }, (error) => {
      console.log(error);
      alert('Ocurrio un error');
    });
  }
  getCategorias() {
    this.categoriaservice.get().subscribe((data: Categoria[]) => {
      this.categorias = data;
    }, (error) => {
      console.log(error);
      alert('Ocurrio un error');
    });
  }
  guardar() {
    this.loading();
    if (!this.proveedorForm.invalid) {
      this.proveedorService.activar_proveedor(this.proveedorForm.value).subscribe((data) => {
        Swal.fire({
          title: 'Aviso',
          text: "Proveedor activado con éxito!",
          type: 'success',
          showConfirmButton: false,
          timer: 700,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
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
      console.log(this.proveedorForm.value);
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
  cargar(id) {
    this.proveedorService.pendientes_datos(id).subscribe((data: any) => {
      this.data = data;
    }, (error) => {
      console.log(error);
      alert('Ocurrio un error');
    });
  }
  borrar(id) {
    Swal.fire({
      title: 'Estas seguro de eliminar el proveedor?',
      text: "Usted no podrá revertir está operación",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.loading();
        this.proveedorService.borrar(id).subscribe((data: Proveedor) => {
          Swal.fire({
            title: 'Borrado!',
            text: 'El proveedor ha sido eliminado.',
            type: 'success',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 700,
          })
          setTimeout(() => {
            window.location.reload();
          }, 800);
        });
      }
    })
  }
  activar(id) {
    Swal.fire({
      title: 'Estas seguro que desea activar el proveedor?',
      text: "Usted no podrá revertir está operación",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, activar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.proveedorService.activar(id).subscribe((data: Proveedor) => {
          Swal.fire({
            title: 'Activado!',
            text: 'El proveedor ha sido activado.',
            type: 'success',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 700,
          })
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
