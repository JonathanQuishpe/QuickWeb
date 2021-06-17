import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAsignarComponent } from './admin-asignar.component';

describe('AdminAsignarComponent', () => {
  let component: AdminAsignarComponent;
  let fixture: ComponentFixture<AdminAsignarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAsignarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
