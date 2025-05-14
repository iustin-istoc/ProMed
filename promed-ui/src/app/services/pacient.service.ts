import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pacient {
  patientID: number;
  name: string;
  // adaugă aici restul câmpurilor din modelul tău
}

@Injectable({
  providedIn: 'root'
})
export class PacientService {
  private apiUrl = 'https://localhost:7023/api/Patients'; // verif că exact așa e endpointul în Swagger

  constructor(private http: HttpClient) {}

  getPacienti(): Observable<Pacient[]> {
    return this.http.get<Pacient[]>(this.apiUrl);
  }

  adaugaPacient(pacient: Partial<Pacient>): Observable<Pacient> {
    return this.http.post<Pacient>(this.apiUrl, pacient);
  }
  
}
