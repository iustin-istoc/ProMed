import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = '';
  parola = '';
  rol = 'Pacient';
  eroare = '';
  fullName = '';
  cnp = '';
  phone = '';
  dateOfBirth = '';


  constructor(private http: HttpClient, private router: Router) {}

  onRegister() {
  this.http.post('https://localhost:7023/api/Auth/register', {
    email: this.email,
    parola: this.parola,
    rol: 'Pacient',
    fullName: this.fullName,
    cnp: this.cnp,
    phone: this.phone,
    dateOfBirth: this.dateOfBirth
  }).subscribe({
    next: () => this.router.navigate(['/login']),
    error: () => this.eroare = 'Eroare la înregistrare'
  });
}

}
