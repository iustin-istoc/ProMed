import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { AuthService } from '../../services/auth.service';
import { PacientService } from '../../services/pacient.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarPacientComponent } from '../calendar-pacient/calendar-pacient.component';
@Component({
  selector: 'app-dashboard-pacient',
  standalone: true,
  templateUrl: './dashboard-pacient.component.html',
  imports: [CommonModule,FormsModule,CalendarPacientComponent]
})
export class DashboardPacientComponent implements OnInit {
  programari: any[] = [];
  emailPacient: string = '';
  numePacient: string = '';
  spitale: any[] = [];
  doctori: any[] = [];
  specializari: string[] = [];
  doctoriFiltrati: any[] = [];

programareNoua = {
  spitalID: null,
  specializare: '',
  doctorID: null,
  appointmentDate: '',
  reason: ''
};  

  constructor(
    private appointmentService: AppointmentService,
    private auth: AuthService,
    private pacientService: PacientService
  ) {}

  ngOnInit(): void {
    this.emailPacient = this.auth.getEmail();
    this.getProgramariPacient();
    this.getNumePacient();
    this.getSpitale();
    this.getDoctori();
  }

  getProgramariPacient() {
  this.appointmentService.getProgramariPentruPacient().subscribe(data => {
    this.programari = data;
  });
}


  getNumePacient() {
    this.pacientService.getPacienti().subscribe(data => {
      const pacient = data.find((p: any) => p.email === this.emailPacient);
      this.numePacient = pacient ? pacient.fullName : 'Pacient';
    });
  }

  logout() {
    this.auth.logout();
  }

  getSpitale() {
  this.pacientService.getSpitale().subscribe(data => this.spitale = data);
}

getDoctori() {
  this.pacientService.getDoctori().subscribe(data => {
    this.doctori = data;
    this.specializari = [...new Set(data.map((d: any) => d.specialization))];
  });
}

onSpitalSauSpecializareChange() {
  const { spitalID, specializare } = this.programareNoua;
  this.doctoriFiltrati = this.doctori.filter((d: any) =>
    d.hospitalID === Number(spitalID) && d.specialization === specializare
  );
}

adaugaProgramare() {
  const programare = {
    pacientID: null, // backend-ul va asocia pacientul pe baza tokenului
    doctorID: this.programareNoua.doctorID,
    appointmentDate: this.programareNoua.appointmentDate,
    reason: this.programareNoua.reason
  };

  this.appointmentService.adaugaProgramare(programare).subscribe(() => {
    alert('Programare înregistrată!');
    this.getProgramariPacient();
  });
}
}
