import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { UsuarioService } from './usuario.service';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  messageSource = new Subject();
  currentMessage = this.messageSource.asObservable();
  constructor(
    private afMessaging: AngularFireMessaging,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
  ) {
  }

  requestPermission(usuario) {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    }
    this.afMessaging.requestPermission
      .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      .subscribe(
        (token) => {
          var fduser = new FormData();
          fduser.append('id', usuario.id);
          fduser.append('token', token);
          this.usuarioService.token(fduser).subscribe(() => {
            console.log('Permission granted! Save to the server!', token);
          })
        },
        (error) => { console.error('no se pudo caragr el ligin'); },
      );
  }
  receiveMessage() {
    this.afMessaging.onMessage(payload => {
      this.showMessage(payload.notification);
      this.messageSource.next(payload);
    });
  }

  showMessage(payload) {
    Swal.fire({
      title: payload.title,
      text: payload.body,
      type: 'info',
      timer: 3000,
    });
  }

}
