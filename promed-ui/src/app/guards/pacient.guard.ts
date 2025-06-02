import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PacientGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    const role = this.auth.getRole();
    return this.auth.isLoggedIn() && role === 'Pacient'
      ? true
      : this.router.parseUrl('/login');
  }
}
