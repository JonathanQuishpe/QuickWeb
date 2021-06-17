import { Component, OnInit } from '@angular/core';
import { AdministracionService } from '../../service/administracion.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private adminService: AdministracionService,
    private router: Router, ) { }

  ngOnInit() {
  }

  cerrar_sesion() {
    this.adminService.cerrar();
    this.router.navigateByUrl('/administracion');

  }

}
