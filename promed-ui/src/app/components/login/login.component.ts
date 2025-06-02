import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = '';
  parola: string = '';
  eroare: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
  this.authService.login(this.email, this.parola).subscribe({
    next: (res) => {
      this.authService.saveToken(res.token);

      const role = res.role;

      console.log('Token:', res.token);
      console.log('Rol:', role);

      if (role === 'Admin') {
        this.router.navigate(['/dashboard-admin']);
      } else if (role === 'Pacient') {
        this.router.navigate(['/dashboard-pacient']);
      } else if (role === 'Doctor') {
        this.router.navigate(['/dashboard-doctor']);
      } else {
        this.eroare = 'Rol necunoscut!';
      }
    },
    error: () => {
      this.eroare = 'Email sau parolă greșite.';
    }
  });
}

}
