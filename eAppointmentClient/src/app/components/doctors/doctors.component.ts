import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { DoctorModel } from '../../models/doctor.model';
import { CommonModule } from '@angular/common';
import { departments } from '../../constants';
import { FormsModule, NgForm } from '@angular/forms';
import { FormValidateDirective } from 'form-validate-angular';
import { SwalService } from '../../services/swal.service';
import { DoctorPipe } from '../../pipe/doctor.pipe';

@Component({
  selector: 'app-doctors',
  imports: [CommonModule, RouterLink, FormsModule, FormValidateDirective, DoctorPipe],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent implements OnInit {
  doctors: DoctorModel[] = []
  departments = departments;

  @ViewChild("addModelCloseBtn") addModelCloseBtn: ElementRef<HTMLButtonElement> | undefined
  @ViewChild("updateModalCloseBtn") updateModalCloseBtn: ElementRef<HTMLButtonElement> | undefined

  createModel: DoctorModel = new DoctorModel()
  updateModel: DoctorModel = new DoctorModel()

  search: string = "";

  constructor(
    private http: HttpService,
    private swal: SwalService) { }
  ngOnInit(): void {
    this.getAll();
  }


  getAll() {
    this.http.getWithBody<DoctorModel[]>("Doctors", 3, (res) => {
      console.log(res.data)
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

        this.swal.callToast(res.data.fullName, "success")
        this.getAll()
        this.addModelCloseBtn?.nativeElement.click()
        this.createModel = new DoctorModel();
      })
    }
  }

  delete(id: string, fullName: string) {
    this.swal.callSwal("Delete Doctor", `You want to delete ${fullName}`, "Delete", () => {
      this.http.delete<string>(`Doctors/${id}`, (res) => {
        this.swal.callToast(res.data, "info");
        this.getAll();
      });
    });
  }

  get(data: DoctorModel) {
    console.log(data);

    this.updateModel = { ...data }
    this.updateModel.department = data.department;
  }

  update(form: NgForm) {
    if (form.valid) {
      this.http.put("Doctors", this.updateModel, (res) => {

        this.swal.callToast(res.data.fullName, "success")
        this.getAll()
        this.updateModalCloseBtn?.nativeElement.click()
      })
    }
  }
}
