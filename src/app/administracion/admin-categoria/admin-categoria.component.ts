import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Categoria } from '../../model/categoria';
import { CategoriaService } from '../../service/categoria.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-admin-categoria',
  templateUrl: './admin-categoria.component.html',
  styleUrls: ['./admin-categoria.component.css']
})
export class AdminCategoriaComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  categorias: Categoria[];
  categoriaForm: FormGroup;
  categoriaUpdate: FormGroup;
  displayedColumns: string[] = ['nombre', 'descripcion', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Categoria>();
  modalRef: BsModalRef;
  constructor(
    private categoriaservice: CategoriaService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    this.categoriaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
    this.categoriaUpdate = this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
    this.getCategorias();
    this.dataSource.paginator = this.paginator;
  }
  guardar() {
    this.loading();
    if (!this.categoriaForm.invalid) {
      this.categoriaservice.guardar(this.categoriaForm.value).subscribe((data) => {
        Swal.fire({
          title: 'Aviso',
          text: "Categoría ingresada con éxito!",
          type: 'success',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 600);
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
      console.log(this.categoriaForm.value);
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
  getCategorias() {
    this.categoriaservice.get().subscribe((data: Categoria[]) => {
      console.log(data)
      this.categorias = data;
      this.dataSource.data = data;
    }, (error) => {
      console.log(error);
      alert('Ocurrio un error');
    });
  }

  borrar(id) {
    Swal.fire({
      title: 'Estas seguro de eleminar la categoría?',
      text: "Usted no pordrá revertir está operación",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.loading();
        this.categoriaservice.contar(id).subscribe(number => {
          if (number == 0) {
            this.categoriaservice.borrar(id).subscribe((data: Categoria) => {
              Swal.fire({
                title: 'Borrado!',
                text: 'La categoría ha sido eliminada.',
                type: 'success',
                showCancelButton: false,
                showConfirmButton: false,
                timer: 700,
              });
              setTimeout(() => {
                window.location.reload();
              }, 800);
            });
          } else {
            Swal.fire({
              title: 'Aviso!',
              text: 'Existen proveedores en esta categoría y no se puede eliminar.',
              type: 'warning',
              showCancelButton: false,
            });
          }
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
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openModal(template: TemplateRef<any>, id) {
    var categoria = this.categorias.filter(function (c) {
      return c.id == id;
    });
    this.categoriaUpdate.setValue({
      id: categoria[0].id,
      descripcion: categoria[0].descripcion,
      nombre: categoria[0].nombre,
    })
    this.modalRef = this.modalService.show(template);
  }
  actualizar() {
    this.loading();
    if (!this.categoriaUpdate.invalid) {
      this.categoriaservice.actualizar(this.categoriaUpdate.value).subscribe((data) => {
        Swal.fire({
          title: 'Aviso',
          text: "Categoría actualizada con éxito!",
          type: 'success',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
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
