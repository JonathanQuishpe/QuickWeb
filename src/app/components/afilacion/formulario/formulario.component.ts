import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProveedorService } from '../../../service/proveedor.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  afilicacionForm: FormGroup;
  image: File;
  fd = new FormData();
  constructor(
    private formBuilder: FormBuilder,
    private proveedorService: ProveedorService,
    private router: Router,
  ) {
    this.afilicacionForm = new FormGroup({
      'datosContacto': new FormGroup({
        'nombres': new FormControl(null, Validators.required),
        'apellidos': new FormControl(null, Validators.required),
        'convencional': new FormControl(null, Validators.required),
        'celular': new FormControl(null, Validators.required),
        'imagen': new FormControl(null, Validators.required),
      }),
      'datosPersonales': new FormGroup({
        'ciudad': new FormControl(null, Validators.required),
        'barrio': new FormControl(null, Validators.required),
        'sector': new FormControl(null, Validators.required),
        'correo': new FormControl(null, [Validators.required, Validators.email]),
      }),
      'datosServicio': new FormGroup({
        'categoria': new FormControl(null, Validators.required),
        'descripcion': new FormControl(null, Validators.required),
      }),
    });
  }

  ngOnInit() {
  }


  imageSelected(event) {
    var image = <File>event.target.files[0];
    if (this.validateFile(image)) {
      this.image = image;
    } else {
      this.afilicacionForm.patchValue({
        datosContacto: {
          imagen: null,
        },
      });
    }
  }

  validateFile(documento: any) {
    var estado = true;
    var ext = documento.name.substring(documento.name.lastIndexOf('.') + 1);
    console.log(documento.size);
    if (ext.toLowerCase() === 'pdf' && documento.size < (2000000)) {
      estado = true;
    }
    else {
      estado = false;
      if (ext.toLowerCase() !== 'pdf') {
        Swal.fire({
          title: 'Aviso',
          text: "El formato del documento es inválido !",
          type: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'ACEPTAR'
        });
        return;
      }
      if (documento.size > (2000000)) {
        Swal.fire({
          title: 'Aviso',
          text: "El documento es muy grande !",
          type: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'ACEPTAR'
        });
        return;
      }
    }

    return estado;
  }

  afiliarse(enviar) {
    if (!enviar) {
      Swal.fire({
        title: 'Aviso!',
        text: 'Llene todos los campos del formulario.!',
        type: 'warning',
        showConfirmButton: true,
      });

    } else {
      this.loading();
      this.fd.append('nombres', this.afilicacionForm.get('datosContacto').get('nombres').value);
      this.fd.append('apellidos', this.afilicacionForm.get('datosContacto').get('apellidos').value);
      this.fd.append('email', this.afilicacionForm.get('datosPersonales').get('correo').value);
      this.fd.append('direccion', this.afilicacionForm.get('datosPersonales').get('ciudad').value + '-' + this.afilicacionForm.get('datosPersonales').get('sector').value + '-' + this.afilicacionForm.get('datosPersonales').get('barrio').value);
      this.fd.append('ciudad', this.afilicacionForm.get('datosPersonales').get('ciudad').value);
      this.fd.append('sector', this.afilicacionForm.get('datosPersonales').get('sector').value);
      this.fd.append('barrio', this.afilicacionForm.get('datosPersonales').get('barrio').value);
      this.fd.append('celular', this.afilicacionForm.get('datosContacto').get('celular').value);
      this.fd.append('convencional', this.afilicacionForm.get('datosContacto').get('convencional').value);
      this.fd.append('descripcion', this.afilicacionForm.get('datosServicio').get('descripcion').value);
      this.fd.append('imagen', this.image, this.image.name);
      this.fd.append('id_categoria', this.afilicacionForm.get('datosServicio').get('categoria').value);
      this.proveedorService.guardar(this.fd).subscribe(data => {
        if (data === 'fail') {
          Swal.fire({
            title: 'Aviso!',
            text: 'El correo ya se encuentra registrado',
            type: 'warning',
            showCancelButton: false,
          });
        } else {
          Swal.fire({
            title: 'Registrado!',
            text: 'Su proceso de afiliacion se ha realizado de manera correcta. Espere el mensaje de confirmaciòn',
            type: 'success',
            showCancelButton: false,
            //showConfirmButton: false,
            timer: 6000,
          });
          setTimeout(() => {
            this.router.navigateByUrl('/landscape');
          }, 5000);
        }

      },
        (error) => {
          Swal.fire({
            title: 'Aviso',
            text: "Problemas en el servidor intente mas tarde !",
            type: 'warning',
            showConfirmButton: false,
          });
        }
      );

    }
  }
  loading() {
    Swal.fire({
      title: 'Cargando....',
      imageUrl: 'https://www.qckservice.com/servicios/public/icons/load.gif',
      imageWidth: 70,
      imageHeight: 65,
      imageAlt: 'Loading',
      showConfirmButton: false,
    });
  }


}
