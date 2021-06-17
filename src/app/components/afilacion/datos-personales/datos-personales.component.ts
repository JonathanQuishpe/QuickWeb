import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  constructor(
  ) { }
  @Input() regForm: FormGroup;
  ngOnInit() {
  }
  step2Submitted() {
    this.regForm.get('datosPersonales').get('ciudad').markAsTouched();
    this.regForm.get('datosPersonales').get('ciudad').updateValueAndValidity();
  }

}
