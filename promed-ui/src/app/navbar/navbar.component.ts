import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() numeUtilizator: string = '';
  @Input() onLogout!: () => void;

  ngOnInit(): void {}

  logout(): void {
    if (this.onLogout) {
      console.log('NavbarComponent: logout triggered');
      this.onLogout();
    }
  }
}
