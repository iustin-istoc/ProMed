import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PacientService, Pacient } from './services/pacient.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  pacienti: Pacient[] = [];
  numePacientNou: string = '';

  constructor(private pacientService: PacientService) {}

  ngOnInit(): void {
    this.pacientService.getPacienti().subscribe({
      next: (data) => {
        this.pacienti = data;
        console.log('Pacienți:', data);
      },
      error: (err) => {
        console.error('Eroare la preluare pacienți:', err);
      }
    });
  }

  adaugaPacient(): void {
    const pacientNou = { name: this.numePacientNou };

    this.pacientService.adaugaPacient(pacientNou).subscribe({
      next: (p) => {
        this.pacienti.push(p);
        this.numePacientNou = '';
      },
      error: (err) => {
        console.error('Eroare la adăugare pacient:', err);
      }
    });
  }
}
