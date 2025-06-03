import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DoctorHospitalService {
  private doctorApiUrl = 'https://localhost:7023/api/Doctors';
  private doctorHospitalApiUrl = 'https://localhost:7023/api/DoctorHospitals';

  constructor(private http: HttpClient) {}

  // Asociază un doctor la un spital
  asociazaDoctorLaSpital(doctorID: number, hospitalID: number): Observable<any> {
  return this.http.post(`${this.doctorHospitalApiUrl}/assign-doctor/${doctorID}/to-hospital/${hospitalID}`, {});
}


  // Returnează toate asocierile doctor-spital
  getAsocieri(): Observable<any[]> {
    return this.http.get<any[]>(`${this.doctorHospitalApiUrl}`);
  }

  // Șterge toate asocierile pentru un doctor
  stergeToateAsocierile(doctorID: number): Observable<any> {
  return this.http.delete(`${this.doctorHospitalApiUrl}/doctor/${doctorID}`).pipe(
    tap(() => console.log(`Asocierile pentru doctorul ${doctorID} au fost șterse.`))
  );
  }

  stergeAsociere(doctorID: number, hospitalID: number): Observable<any> {
  return this.http.delete(`${this.doctorHospitalApiUrl}/doctor/${doctorID}/hospital/${hospitalID}`);
}

}
