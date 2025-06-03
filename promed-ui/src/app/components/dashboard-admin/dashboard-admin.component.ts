import { Component, OnInit } from '@angular/core';
import { PacientService } from '../../services/pacient.service';
import { DoctorService } from '../../services/doctor.service';
import { HospitalService } from '../../services/hospital.service';
import { AppointmentService } from '../../services/appointment.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DoctorHospitalService } from '../../services/doctorhospital.service';
import { lastValueFrom } from 'rxjs';
import { NavbarComponent } from '../../navbar/navbar.component';



@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  templateUrl: './dashboard-admin.component.html',
  imports: [FormsModule, CommonModule, NavbarComponent],
  styleUrls: ['./dashboard-admin.component.css']
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

  programareNoua: {
    pacientID: number | null;
    doctorID: number | null;
    appointmentDate: string;
    reason: string;
    status: string;
  } = {
      pacientID: null,
      doctorID: null,
      appointmentDate: '',
      reason: '',
      status: 'Programat'
    };





  constructor(
    private pacientService: PacientService,
    private doctorService: DoctorService,
    private hospitalService: HospitalService,
    private appointmentService: AppointmentService,
    public authService: AuthService,
    private doctorHospitalService: DoctorHospitalService
  ) { }

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
          if (!savedDoctor?.doctorID) {
            alert("Eroare: ID-ul doctorului nu a fost returnat.");
            return;
          }

          const requests = this.spitaleSelectateDoctorNou.map(hospitalId =>
            this.doctorHospitalService.asociazaDoctorLaSpital(savedDoctor.doctorID, hospitalId)
          );

          Promise.all(requests.map(req => lastValueFrom(req))).then(() => {
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

    const spitaleInitiale = this.asocieriDoctorSpitale
      .filter(a => a.doctorID === id)
      .map(a => a.hospitalID);

    const spitaleNoi = this.doctorEditat.spitaleSelectate;

    const deAdaugat = spitaleNoi.filter((idNou: number) => !spitaleInitiale.includes(idNou));
    const deSters = spitaleInitiale.filter((idVechi: number) => !spitaleNoi.includes(idVechi));

    this.doctorService.editeazaDoctor(id, this.doctorEditat).subscribe(() => {
      const cereriAdaugare = deAdaugat.map((hID: number) =>
        this.doctorHospitalService.asociazaDoctorLaSpital(id, hID)
      );

      const cereriStergere = deSters.map((hID: number) =>
        this.doctorHospitalService.stergeAsociere(id, hID)
      );

      const toateCereri = [...cereriAdaugare, ...cereriStergere];

      Promise.all(toateCereri.map((req: any) => lastValueFrom(req))).then(() => {
        this.doctorEditat = null;
        this.getDoctori();
        this.doctorHospitalService.getAsocieri().subscribe(data => {
          this.asocieriDoctorSpitale = data;
        });
      });
    });
  }



  toggleSpitalDoctor(hospitalID: number) {
    const index = this.doctorEditat.spitaleSelectate.indexOf(hospitalID);
    if (index === -1) {
      this.doctorEditat.spitaleSelectate.push(hospitalID);
    } else {
      this.doctorEditat.spitaleSelectate.splice(index, 1);
    }
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
  const programareTrimisa = {
    pacientID: this.programareNoua.pacientID!,
    doctorID: this.programareNoua.doctorID!,
    appointmentDate: new Date(this.programareNoua.appointmentDate).toISOString(),  // asigură format ISO
    reason: this.programareNoua.reason.trim(),
    status: "Programat"
  };

  console.log("Programare trimisă:", programareTrimisa);

  this.appointmentService.adaugaProgramare(programareTrimisa).subscribe({
    next: () => {
      alert("Programare adăugată cu succes!");
      this.programareNoua = {
        pacientID: null,
        doctorID: null,
        appointmentDate: '',
        reason: '',
        status: 'Programat'
      };
      this.getProgramari();
    },
    error: err => {
      console.error("Eroare la salvarea programării:", err);
    }
  });
}

logout() {
    this.authService.logout();
  }




}
