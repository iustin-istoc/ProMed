import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-doctor',
  standalone: true,
  templateUrl: './dashboard-doctor.component.html',
  imports: [CommonModule]
})
export class DashboardDoctorComponent implements OnInit {
  programari: any[] = [];
  doctorEmail: string = '';

  constructor(
    private appointmentService: AppointmentService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.doctorEmail = this.authService.getEmail();
    this.getProgramari();
  }

  getProgramari() {
    this.appointmentService.getProgramariPentruDoctor().subscribe(data => {
      this.programari = data;
    });
  }

  logout() {
    this.authService.logout();
  }
}
