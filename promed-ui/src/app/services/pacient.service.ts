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

 getPacienti() {
  return this.http.get<any[]>(this.apiUrl);
}

adaugaPacient(pacient: any) {
  return this.http.post(this.apiUrl, pacient);
}

editeazaPacient(id: number, pacient: any) {
  return this.http.put(`${this.apiUrl}/${id}`, pacient);
}

stergePacient(id: number) {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

  
}
