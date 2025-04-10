import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { DoctorModel } from '../../models/doctor.model';
import { CommonModule } from '@angular/common';
import { departments } from '../../constants';
import { FormsModule, NgForm } from '@angular/forms';
import { FormValidateDirective } from 'form-validate-angular';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-doctors',
  imports: [CommonModule, RouterLink, FormsModule, FormValidateDirective],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent implements OnInit {
  doctors: DoctorModel[] = []
  departments = departments;

  @ViewChild("addModelCloseBtn") addModelCloseBtn: ElementRef<HTMLButtonElement> | undefined

  createModel: DoctorModel = new DoctorModel()
  constructor(
    private http: HttpService,
    private swal: SwalService) { }
  ngOnInit(): void {
    this.getAll();
  }


  getAll() {
    this.http.getWithBody<DoctorModel[]>("Doctors", 3, (res) => {
      this.doctors = res.data
    });
  }

  getAllDoctors() {
    this.http.getWithBody<DoctorModel[]>("doctors", 3, (res) => {
      console.log("Doktorlar geldi:", res.data);
    }, (err) => {
      console.error("Hata oluştu:", err);
    });
  }

  add(form: NgForm) {
    if (form.valid) {
      this.http.post("Doctors", this.createModel, (res) => {

        this.swal.callToast(res.data.fullName,"success")
        this.getAll()
        this.addModelCloseBtn?.nativeElement.click()
        this.createModel = new DoctorModel();
      })
    }
  }
}
