import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private apiUrl = 'https://localhost:7023/api/Doctors'; 

  constructor(private http: HttpClient) {}

  getDoctori(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  adaugaDoctor(doctor: any): Observable<any> {
    return this.http.post(this.apiUrl, doctor);
  }

  editeazaDoctor(id: number, doctor: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, doctor);
  }

  stergeDoctor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
