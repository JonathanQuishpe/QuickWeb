import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormularioComponent } from '../formulario/formulario.component'
@Component({
  selector: 'app-datos-contacto',
  templateUrl: './datos-contacto.component.html',
  styleUrls: ['./datos-contacto.component.css']
})
export class DatosContactoComponent implements OnInit {

  constructor(
    private formulario: FormularioComponent,
  ) { }
  @Input() regForm: FormGroup;

  ngOnInit() {
  }

  step1Submitted() {
    this.regForm.get('datosContacto').get('nombres').markAsTouched();
    this.regForm.get('datosContacto').get('nombres').updateValueAndValidity();
    this.regForm.get('datosContacto').get('apellidos').markAsTouched();
    this.regForm.get('datosContacto').get('apellidos').updateValueAndValidity();
  }

  imageSelected($event) {
    this.formulario.imageSelected($event);
  }

}
