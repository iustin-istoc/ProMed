import { Component, OnInit } from '@angular/core';
import { PacientService } from './services/pacient.service';
import { DoctorService } from './services/doctor.service';
import { HospitalService } from './services/hospital.service';
import { AppointmentService } from './services/appointment.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [FormsModule, CommonModule]
})
export class AppComponent implements OnInit {
  //  PACIENȚI
  pacienti: any[] = [];
  numePacientNou: string = '';
  pacientEditat: any = null;

  //  DOCTORI
  doctori: any[] = [];
  numeDoctorNou: string = '';
  doctorEditat: any = null;

  //  SPITALE
  spitale: any[] = [];
  numeSpitalNou: string = '';
  orasSpitalNou: string = '';
  adresaSpitalNoua: string = '';
  spitalEditat: any = null;

  // PROGRAMARI
  programari: any[] = [];

  spitalSelectat: any = null;
  doctoriSpital: any[] = [];

  programareNoua = {
    pacientID: null,
    doctorID: null,
    appointmentDate: '',
    reason: ''
  };



  constructor(
    private pacientService: PacientService,
    private doctorService: DoctorService,
    private hospitalService: HospitalService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.getPacienti();
    this.getDoctori();
    this.getSpitale();
    this.getProgramari();

  }

  // ===== PACIENȚI =====
  getPacienti() {
    this.pacientService.getPacienti().subscribe(data => {
      this.pacienti = data;
    });
  }

  adaugaPacient() {
    if (!this.numePacientNou.trim()) return;

    const nouPacient = {
      fullName: this.numePacientNou,
      email: `auto${Math.random().toString(36).substring(2, 7)}@demo.com`,
      phone: '0712345678',
      cnp: '1234567890123',
      dateOfBirth: new Date()
    };

    this.pacientService.adaugaPacient(nouPacient).subscribe(() => {
      this.numePacientNou = '';
      this.getPacienti();
    });
  }

  editeazaPacient(pacient: any) {
    this.pacientEditat = { ...pacient };
  }

  salveazaEditare() {
    this.pacientService.editeazaPacient(this.pacientEditat.patientID, this.pacientEditat).subscribe(() => {
      this.pacientEditat = null;
      this.getPacienti();
    });
  }

  stergePacient(id: number) {
    this.pacientService.stergePacient(id).subscribe(() => {
      this.getPacienti();
    });
  }

  anuleazaEditare() {
    this.pacientEditat = null;
  }

  // ===== DOCTORI =====
  getDoctori() {
    this.doctorService.getDoctori().subscribe(data => {
      this.doctori = data;
    });
  }

  adaugaDoctor() {
    if (!this.numeDoctorNou.trim()) return;

    const nouDoctor = {
      fullName: this.numeDoctorNou,
      specialization: 'Generalist',
      email: `doc${Math.random().toString(36).substring(2, 6)}@med.com`,
      phone: '0722123456',
      hospitalID: 1
    };

    this.doctorService.adaugaDoctor(nouDoctor).subscribe(() => {
      this.numeDoctorNou = '';
      this.getDoctori();
    });
  }

  editeazaDoctor(doc: any) {
    this.doctorEditat = { ...doc };
  }

  salveazaEditareDoctor() {
    this.doctorService.editeazaDoctor(this.doctorEditat.doctorID, this.doctorEditat).subscribe(() => {
      this.doctorEditat = null;
      this.getDoctori();
    });
  }

  stergeDoctor(id: number) {
    this.doctorService.stergeDoctor(id).subscribe(() => {
      this.getDoctori();
    });
  }

  anuleazaEditareDoctor() {
    this.doctorEditat = null;
  }
  // SPITALE
  getSpitale() {
  this.hospitalService.getSpitale().subscribe(data => {
    this.spitale = data;
  });
}

adaugaSpital() {
  if (!this.numeSpitalNou.trim()) return;

  const spitalNou = {
    name: this.numeSpitalNou,
    city: this.orasSpitalNou,
    address: this.adresaSpitalNoua
  };

  console.log('Trimitem spital:', spitalNou); // <== Asta ne arată datele reale

  this.hospitalService.adaugaSpital(spitalNou).subscribe(() => {
    this.numeSpitalNou = '';
    this.orasSpitalNou = '';
    this.adresaSpitalNoua = '';
    this.getSpitale();
  });
}


editeazaSpital(spital: any) {
  this.spitalEditat = { ...spital };
}

salveazaEditareSpital() {
  this.hospitalService.editeazaSpital(this.spitalEditat.hospitalID, this.spitalEditat).subscribe(() => {
    this.spitalEditat = null;
    this.getSpitale();
  });
}

stergeSpital(id: number) {
  this.hospitalService.stergeSpital(id).subscribe(() => {
    this.getSpitale();
  });
}

anuleazaEditareSpital() {
  this.spitalEditat = null;
}
// PROGRAMARI

getProgramari() {
  this.appointmentService.getProgramari().subscribe(data => {
    this.programari = data;
  });
}

onSpitalChange() {
  this.doctoriSpital = this.doctori.filter(d => d.hospitalID === Number(this.spitalSelectat));
}

adaugaProgramare() {
  if (!this.programareNoua.pacientID || !this.programareNoua.doctorID) return;

  this.appointmentService.adaugaProgramare(this.programareNoua).subscribe(() => {
    alert('Programare salvată cu succes!');
    this.programareNoua = {
      pacientID: null,
      doctorID: null,
      appointmentDate: '',
      reason: ''
    };
    this.getProgramari();
  });
}

}
