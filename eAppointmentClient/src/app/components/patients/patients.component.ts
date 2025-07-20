import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PatientModel } from '../../models/patient.model';
import { HttpService } from '../../services/http.service';
import { SwalService } from '../../services/swal.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormValidateDirective } from 'form-validate-angular';
import { PatientPipe } from '../../pipe/patient.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-patient',
  imports: [CommonModule, FormsModule, FormValidateDirective, PatientPipe, RouterLink],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent implements OnInit {
  patients: PatientModel[] = []

  @ViewChild("addModelCloseBtn") addModelCloseBtn: ElementRef<HTMLButtonElement> | undefined
  @ViewChild("updateModalCloseBtn") updateModalCloseBtn: ElementRef<HTMLButtonElement> | undefined

  createModel: PatientModel = new PatientModel()
  updateModel: PatientModel = new PatientModel()

  search: string = "";

  constructor(
    private http: HttpService,
    private swal: SwalService) { }
  ngOnInit(): void {
    this.getAll();
  }


  getAll() {
    this.http.getWithBody<PatientModel[]>("Patients", 3, (res) => {
      console.log(res.data)
      this.patients = res.data
    });
  }

  add(form: NgForm) {
    if (form.valid) {
      this.http.post("Patients", this.createModel, (res) => {

        this.swal.callToast(res.data.fullName, "success")
        this.getAll()
        this.addModelCloseBtn?.nativeElement.click()
        this.createModel = new PatientModel();
      })
    }
  }

  delete(id: string, fullName: string) {
    this.swal.callSwal("Delete Patient", `You want to delete ${fullName}`, "Delete", () => {
      this.http.delete<string>(`Patients/${id}`, (res) => {
        this.swal.callToast(res.data, "info");
        this.getAll();
      });
    });
  }

  get(data: PatientModel) {
    console.log(data);

    this.updateModel = { ...data }
  }

  update(form: NgForm) {
    if (form.valid) {
      this.http.put("Patients", this.updateModel, (res) => {

        this.swal.callToast(res.data.fullName, "success")
        this.getAll()
        this.updateModalCloseBtn?.nativeElement.click()
      })
    }
  }
}
