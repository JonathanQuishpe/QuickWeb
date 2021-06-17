import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { SideComponent } from './side/side.component';
import { StartComponent } from './start/start.component';
import { ForgotComponent } from './forgot/forgot.component';
import { AuthGuard } from './security/auth.guard';
import { AdministracionGuard } from './security/administracion.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { ContratarComponent } from './contratar/contratar.component';
import { NumberDirective } from './numbers-only.directive';
import { LetterDirective } from './letters-only.directive';
import { EstadoComponent } from './estado/estado.component';
import { AprobarComponent } from './aprobar/aprobar.component';
import { LoginComponent } from './administracion/login/login.component';
import { MenuComponent } from './administracion/menu/menu.component';
import { AdminProveedorComponent } from './administracion/admin-proveedor/admin-proveedor.component';
import { AdminCategoriaComponent } from './administracion/admin-categoria/admin-categoria.component';
import { AdminAsignarComponent } from './administracion/admin-asignar/admin-asignar.component';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { MatPaginatorIntl } from "@angular/material";
import { PaginatePipe } from './pipes/paginate.pipe';
import { MatPaginatorIntlCro } from './language/paginator-es';
import { DemoMaterialModule } from './lib/material-module';
import { FiltroPipe } from './pipes/filtro.pipe';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbStepperModule, NbSidebarModule, NbActionsModule, NbPopoverModule, NbTabComponent, NbTabsetModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { RegistrationStep1Component } from './components/registration-step1/registration-step1.component';
import { RegistrationStep2Component } from './components/registration-step2/registration-step2.component';
import { RegistrationStep3Component } from './components/registration-step3/registration-step3.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AfiliacionComponent } from './formularios/afiliacion/afiliacion.component';
import { UsuarioComponent } from './formularios/usuario/usuario.component';
import { DatosPersonalesComponent } from './components/afilacion/datos-personales/datos-personales.component';
import { DatosContactoComponent } from './components/afilacion/datos-contacto/datos-contacto.component';
import { DatosServicioComponent } from './components/afilacion/datos-servicio/datos-servicio.component';
import { FormularioComponent } from './components/afilacion/formulario/formulario.component';
import { FooterComponent } from './footer/footer.component';
//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { AdminConfigComponent } from './administracion/admin-config/admin-config.component';
//import { NgxMaskModule } from 'ngx-mask'

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'landscape', component: StartComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'proveedor', component: ProveedorComponent },
  { path: 'proveedor/:id', component: ProveedorComponent },
  { path: 'contratar', component: ContratarComponent, canActivate: [AuthGuard] },
  { path: 'contratar/:id', component: ContratarComponent, canActivate: [AuthGuard] },
  { path: 'estado', component: EstadoComponent, canActivate: [AuthGuard] },
  { path: 'aprobar', component: AprobarComponent, canActivate: [AuthGuard] },
  { path: 'login', component: UsuarioComponent },
  { path: 'afiliarse', component: FormularioComponent },
  /*nodulo de administracion*/
  { path: 'administracion', component: LoginComponent },
  { path: 'administracion/menu', component: MenuComponent, canActivate: [AdministracionGuard] },
  { path: 'administracion/proveedor', component: AdminProveedorComponent, canActivate: [AdministracionGuard] },
  { path: 'administracion/categoria', component: AdminCategoriaComponent, canActivate: [AdministracionGuard] },
  { path: 'administracion/asignar', component: AdminAsignarComponent, canActivate: [AdministracionGuard] },
  { path: 'administracion/configuracion', component: AdminConfigComponent, canActivate: [AdministracionGuard] },
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    SideComponent,
    StartComponent,
    ForgotComponent,
    ProveedorComponent,
    ContratarComponent,
    NumberDirective,
    LetterDirective,
    EstadoComponent,
    AprobarComponent,
    LoginComponent,
    MenuComponent,
    AdminProveedorComponent,
    AdminCategoriaComponent,
    AdminAsignarComponent,
    PaginatePipe,
    FiltroPipe,
    RegistrationStep1Component,
    RegistrationStep2Component,
    RegistrationStep3Component,
    AfiliacionComponent,
    UsuarioComponent,
    DatosPersonalesComponent,
    DatosContactoComponent,
    DatosServicioComponent,
    FormularioComponent,
    FooterComponent,
    AdminConfigComponent
  ],
  imports: [
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBMGyUcfwT3JauJS2MyM8CHe3U847DPIQ8",
      authDomain: "notificaciones-73f9d.firebaseapp.com",
      databaseURL: "https://notificaciones-73f9d.firebaseio.com",
      projectId: "notificaciones-73f9d",
      storageBucket: "notificaciones-73f9d.appspot.com",
      messagingSenderId: "837047116674",
      appId: "1:837047116674:web:984fe4b93f57add7f6a59b",
      measurementId: "G-JZEKR15SXY"
    }),
    AngularFireMessagingModule,
    DemoMaterialModule,
    BrowserModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    ToasterModule.forRoot(),
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCuJyBO4ARLVwGdZDSct_ayeCf58RVZbGY',
      libraries: ['geometry', 'places']
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbStepperModule, NbSidebarModule,
    NbActionsModule, NbPopoverModule,
    NbTabsetModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    //MatSliderModule,
    //NgxMaskModule.forRoot()

  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
