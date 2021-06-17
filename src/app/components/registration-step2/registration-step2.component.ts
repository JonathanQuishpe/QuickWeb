import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration-step2',
  templateUrl: './registration-step2.component.html',
  styleUrls: ['./registration-step2.component.css']
})
export class RegistrationStep2Component implements OnInit {

  constructor() { }

  @Input() regForm: FormGroup;

  ngOnInit() {
  }

  step2Submitted() {
    this.regForm.get('inforPago').get('hora_min').markAsTouched();
    this.regForm.get('inforPago').get('hora_min').updateValueAndValidity();
  }

}
