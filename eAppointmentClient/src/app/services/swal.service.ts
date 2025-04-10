import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  callToast(title: string, icon: SweetAlertIcon = 'success') {
    Swal.fire({
      title: title,
      timer: 3000,
      icon: "success",
      position: "bottom-right",
      showCancelButton: false,
      showCloseButton: false,
      showConfirmButton: false,
      toast: true
    })
  }
  callSwal(title: string, text: string, confirmButtonName: string = "Delete", callBack: () => void) {
    Swal.fire({
      title: title,
      text: text,
      icon: "question",
      showConfirmButton: true,
      confirmButtonText: confirmButtonName,
      showCancelButton: true,
      cancelButtonText: "Cancel"
    }).then(res => {
      if (res.isConfirmed) {
        callBack()
      }
    })
  }

}

export type SweetAlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question'