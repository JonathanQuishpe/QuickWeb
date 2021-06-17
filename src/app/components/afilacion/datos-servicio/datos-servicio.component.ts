import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Categoria } from '../../../model/categoria';
import { CategoriaService } from '../../../service/categoria.service';
import { FormularioComponent } from '../formulario/formulario.component';
@Component({
  selector: 'app-datos-servicio',
  templateUrl: './datos-servicio.component.html',
  styleUrls: ['./datos-servicio.component.css']
})
export class DatosServicioComponent implements OnInit {
  categorias: Categoria[];
  constructor(
    private categoriaservice: CategoriaService,
    private formulario: FormularioComponent,
  ) { }
  @Input() regForm: FormGroup;
  formSubmitted: boolean = false;
  ngOnInit() {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaservice.get().subscribe((data: Categoria[]) => {
      this.categorias = data;
    }, (error) => {
      console.log(error);
      alert('Ocurrio un error');
    });
  }
  submit() {
    var categoria = this.regForm.get('datosServicio').get('categoria').value;
    var descripcion = this.regForm.get('datosServicio').get('descripcion').value;
    if (categoria === null || descripcion === null) {
      this.formSubmitted = false;
    } else {
      this.formSubmitted = true;
    }
    this.formulario.afiliarse(this.formSubmitted);

  }
}
