import { TestBed, async, inject } from '@angular/core/testing';

import { AdministracionGuard } from './administracion.guard';

describe('AdministracionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministracionGuard]
    });
  });

  it('should ...', inject([AdministracionGuard], (guard: AdministracionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
