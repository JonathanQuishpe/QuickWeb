import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-registration-step1',
  templateUrl: './registration-step1.component.html',
  styleUrls: ['./registration-step1.component.css']
})
export class RegistrationStep1Component implements OnInit {

  constructor(
    private home: HomeComponent
  ) { }

  @Input() regForm: FormGroup;

  ngOnInit() {
  }

  step1Submitted() {
    this.regForm.get('infoPro').get('alias').markAsTouched();
    this.regForm.get('infoPro').get('alias').updateValueAndValidity();
    this.regForm.get('infoPro').get('descripcion').markAsTouched();
    this.regForm.get('infoPro').get('descripcion').updateValueAndValidity();
  }

  imageSelected($event) {
    this.home.imageSelected($event);
  }

}
