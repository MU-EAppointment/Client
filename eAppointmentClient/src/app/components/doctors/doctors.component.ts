import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { DoctorModel } from '../../models/doctor.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctors',
  imports: [CommonModule, RouterLink],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent implements OnInit {
  doctors : DoctorModel[] = []
  constructor(
    private http : HttpService){}
  ngOnInit(): void {
    this.getAll();
  }
    
  
    getAll(){
      this.http.getWithBody<DoctorModel[]>("Doctors",3, (res) => {
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
}
