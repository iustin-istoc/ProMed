import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7023/api/Auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, parola: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, parola });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getRole(): string {
  const token = localStorage.getItem('token');
  if (!token) return '';

  const decoded: any = jwtDecode(token);
  return decoded['role'] || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || '';
}


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getEmail(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';
    const decoded: any = jwtDecode(token);
    return decoded['email'];
  }

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

}
