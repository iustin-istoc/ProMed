import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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
  mesajSucces = '';

  constructor(private http: HttpClient, private router: Router) { }

  removeSpaces(event: ClipboardEvent) {
    event.preventDefault();
    const text = event.clipboardData?.getData('text')?.replace(/\s/g, '');
    document.execCommand('insertText', false, text);
  }
  sanitizeFullName(name: string): string {
    return name
      .trim()
      .replace(/\s{2,}/g, ' ');
  }

  handleFullNameKeydown(event: KeyboardEvent): void {
  const input = event.target as HTMLInputElement;
  const cursorPos = input.selectionStart || 0;
  const value = input.value;

  
  if (
    event.key === ' ' &&
    (cursorPos === 0 || value[cursorPos - 1] === ' ')
  ) {
    event.preventDefault();
  }
}


  handleFullNamePaste(event: ClipboardEvent): void {
  event.preventDefault();
  const pasted = event.clipboardData?.getData('text') || '';
  const cleaned = pasted.replace(/\s+/g, ' ').trim(); 
  const input = event.target as HTMLInputElement;

  const start = input.selectionStart || 0;
  const end = input.selectionEnd || 0;

  const newValue = input.value.slice(0, start) + cleaned + input.value.slice(end);
  input.value = newValue;
  const inputEvent = new Event('input', { bubbles: true });
  input.dispatchEvent(inputEvent);
}
  onRegister() {
    this.eroare = '';
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    const cnpValid = /^\d{13}$/.test(this.cnp);
    const phoneValid = /^\d{10}$/.test(this.phone);
    const parolaValid = !/\s/.test(this.parola);

    if (!emailValid) {
      this.eroare = 'Email invalid! Folosește formatul user@domeniu.com';
      return;
    }

    if (!parolaValid) {
      this.eroare = 'Parola nu trebuie să conțină spații!';
      return;
    }

    if (!cnpValid) {
      this.eroare = 'CNP-ul trebuie să aibă exact 13 cifre!';
      return;
    }

    if (!phoneValid) {
      this.eroare = 'Numărul de telefon trebuie să aibă exact 10 cifre!';
      return;
    }

    const numeCuratat = this.sanitizeFullName(this.fullName);
    if (!numeCuratat || numeCuratat.length < 3) {
      this.eroare = 'Numele trebuie să conțină cel puțin 3 caractere valide!';
      return;
    }


    this.http.post('https://localhost:7023/api/Auth/register', {
      email: this.email,
      parola: this.parola,
      rol: 'Pacient',
      fullName: this.fullName,
      cnp: this.cnp,
      phone: this.phone,
      dateOfBirth: this.dateOfBirth
    }).subscribe({
      next: () => {
        this.mesajSucces = 'Cont creat cu succes!';
        setTimeout(() => this.router.navigate(['/login']), 1000);
      },
      error: () => this.eroare = 'Eroare la înregistrare'
    });
  }
}
