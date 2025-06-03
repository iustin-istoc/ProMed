import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CalendarPacientComponent } from '../calendar-pacient/calendar-pacient.component';

@Component({
  selector: 'app-dashboard-doctor',
  standalone: true,
  templateUrl: './dashboard-doctor.component.html',
  imports: [CommonModule, FormsModule, NavbarComponent,CalendarPacientComponent]
})
export class DashboardDoctorComponent implements OnInit {
  programari: any[] = [];
  numeDoctor: string = '';
  anuntNou: string = '';

  constructor(
    private auth: AuthService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.numeDoctor = payload.fullName || payload.email || 'Doctor';
    }

    this.getProgramariDoctor();
  }

  getProgramariDoctor() {
    this.appointmentService.getProgramariPentruDoctor().subscribe(data => {
      this.programari = data;
    });
  }

  stergeProgramare(id: number) {
    if (confirm('Sigur vrei să ștergi această programare?')) {
      this.appointmentService.stergeProgramare(id).subscribe(() => {
        this.getProgramariDoctor();
      });
    }
  }

  posteazaAnunt() {
    if (!this.anuntNou.trim()) return;
    // TODO: trimite anunțul către backend (endpoint dedicat)
    alert('Anunțul a fost publicat.');
    this.anuntNou = '';
  }

  logout() {
    this.auth.logout();
  }
}
