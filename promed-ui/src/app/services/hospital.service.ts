import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HospitalService {
  private apiUrl = 'https://localhost:7023/api/Hospitals';

  constructor(private http: HttpClient) {}

  getSpitale(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  adaugaSpital(spital: any): Observable<any> {
    return this.http.post(this.apiUrl, spital);
  }

  stergeSpital(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  editeazaSpital(id: number, spital: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, spital);
  }
}
