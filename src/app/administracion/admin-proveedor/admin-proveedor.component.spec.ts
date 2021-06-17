import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProveedorComponent } from './admin-proveedor.component';

describe('AdminProveedorComponent', () => {
  let component: AdminProveedorComponent;
  let fixture: ComponentFixture<AdminProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
