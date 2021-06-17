import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosServicioComponent } from './datos-servicio.component';

describe('DatosServicioComponent', () => {
  let component: DatosServicioComponent;
  let fixture: ComponentFixture<DatosServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
