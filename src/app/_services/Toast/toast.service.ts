import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }
  presentToast(type: any, position: any, msg: any) {
    const Toast = Swal.mixin({
      toast: true,
      position, // top-end
      showCancelButton: false,
      showCloseButton: true,
      showConfirmButton: false,
      timer: 3000
    });
    Toast.fire({
      icon: type,
      title: msg
    });
  }
}
