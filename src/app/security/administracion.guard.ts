import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdministracionService } from '../service/administracion.service';
@Injectable({
  providedIn: 'root'
})
export class AdministracionGuard implements CanActivate {
  constructor(private adminService: AdministracionService,
    private router: Router,
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.adminService.acceso()) {
      return true;
    } else {
      this.router.navigateByUrl('/administracion');
      return false;
    }
  }
}
