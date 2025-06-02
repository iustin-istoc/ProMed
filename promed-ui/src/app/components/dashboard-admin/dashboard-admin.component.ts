import { Component, OnInit } from '@angular/core';
import { PacientService } from '../../services/pacient.service';
import { DoctorService } from '../../services/doctor.service';
import { HospitalService } from '../../services/hospital.service';
import { AppointmentService } from '../../services/appointment.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DoctorHospitalService } from '../../services/doctorhospital.service';
@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  templateUrl: './dashboard-admin.component.html',
  imports: [FormsModule, CommonModule]
})
export class DashboardAdminComponent implements OnInit {
  //  PACIENȚI
  pacienti: any[] = [];
  numePacientNou: string = '';
  pacientEditat: any = null;

  //  DOCTORI
  doctori: any[] = [];
  numeDoctorNou: string = '';
  doctorEditat: any = null;
  emailDoctorNou = '';
  specializareDoctorNoua = '';
  telefonDoctorNou = '';
  parolaDoctorNoua = '';
  spitalDoctorNou = null;


  //  SPITALE
  spitale: any[] = [];
  numeSpitalNou: string = '';
  orasSpitalNou: string = '';
  adresaSpitalNoua: string = '';
  spitalEditat: any = null;
  spitaleSelectateDoctorNou: number[] = [];
  asocieriDoctorSpitale: any[] = [];


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
    private appointmentService: AppointmentService,
    public authService: AuthService,
    private doctorHospitalService: DoctorHospitalService
  ) {}

  ngOnInit(): void {
    this.getPacienti();
    this.getDoctori();
    this.getSpitale();
    this.getProgramari();
    this.doctorHospitalService.getAsocieri().subscribe(data => {
    this.asocieriDoctorSpitale = data;
  });

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

  resetCampuriDoctor() {
    this.numeDoctorNou = '';
    this.emailDoctorNou = '';
    this.parolaDoctorNoua = '';
    this.specializareDoctorNoua = '';
    this.telefonDoctorNou = '';
    this.spitalDoctorNou = null;
    this.spitaleSelectateDoctorNou = [];
    
  }

  adaugaDoctor() {
  if (
    !this.numeDoctorNou.trim() ||
    !this.emailDoctorNou ||
    !this.parolaDoctorNoua ||
    !this.specializareDoctorNoua ||
    this.spitaleSelectateDoctorNou.length === 0
  ) return;

  const userNou = {
    email: this.emailDoctorNou,
    parola: this.parolaDoctorNoua,
    rol: 'Doctor',
    fullName: this.numeDoctorNou,
    cnp: '0000000000000',
    phone: this.telefonDoctorNou,
    dateOfBirth: new Date()
  };

  this.authService.registerUser(userNou).subscribe({
    next: () => {
      const doctorNou = {
        fullName: this.numeDoctorNou,
        specialization: this.specializareDoctorNoua,
        email: this.emailDoctorNou,
        phone: this.telefonDoctorNou,
        hospitalID: this.spitaleSelectateDoctorNou[0]  // doar pentru a popula câmpul principal
      };

      this.doctorService.adaugaDoctor(doctorNou).subscribe((savedDoctor) => {
        const requests = this.spitaleSelectateDoctorNou.map(hospitalId =>
          this.doctorHospitalService.asociazaDoctorLaSpital(savedDoctor.doctorID, hospitalId)
        );

        // Așteptăm toate cererile POST să se finalizeze (opțional)
        Promise.all(requests.map(req => req.toPromise())).then(() => {
          alert('Doctor adăugat cu succes!');
          this.resetCampuriDoctor();
          this.getDoctori();
          this.doctorHospitalService.getAsocieri().subscribe(data => {
            this.asocieriDoctorSpitale = data;
          });
        });
      });
    },
    error: () => alert('Eroare la crearea contului doctorului.')
  });
}

  editeazaDoctor(doc: any) {
  const spitaleAsociate = this.asocieriDoctorSpitale
    .filter(dh => dh.doctorID === doc.doctorID)
    .map(dh => dh.hospitalID);

  this.doctorEditat = {
    ...doc,
    spitaleSelectate: spitaleAsociate
  };
}


  salveazaEditareDoctor() {
  const id = this.doctorEditat.doctorID;

  this.doctorService.editeazaDoctor(id, this.doctorEditat).subscribe(() => {
    // (Opțional) trimite actualizări de spitale:
    this.doctorHospitalService.stergeToateAsocierile(id).subscribe(() => {
      this.doctorEditat.spitaleSelectate.forEach((hID: number) => {
        this.doctorHospitalService.asociazaDoctorLaSpital(id, hID).subscribe();
      });
    });

    this.doctorEditat = null;
    this.getDoctori();
    this.doctorHospitalService.getAsocieri().subscribe(data => {
      this.asocieriDoctorSpitale = data;
    });
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

getSpitaleNume(doctorID: number): string[] {
  return this.asocieriDoctorSpitale
    .filter(a => a.doctorID === doctorID)
    .map(a => this.spitale.find(s => s.hospitalID === a.hospitalID)?.name || '???');
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

logout() {
    this.authService.logout();
  }

  

}
