import { Routes } from '@angular/router';

import { AdminGuard } from './guards/admin.guard';
import { DoctorGuard } from './guards/doctor.guard';
import { PacientGuard } from './guards/pacient.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
  path: 'register',
  loadComponent: () => import('./components/register/register.component')
    .then(m => m.RegisterComponent)
  },

  {
    path: 'dashboard-admin',
    loadComponent: () => import('./components/dashboard-admin/dashboard-admin.component')
      .then(m => m.DashboardAdminComponent),
    canActivate: [AdminGuard]
  },
  {
    path: 'dashboard-doctor',
    loadComponent: () => import('./components/dashboard-doctor/dashboard-doctor.component')
      .then(m => m.DashboardDoctorComponent),
    canActivate: [DoctorGuard]
  },
  {
    path: 'dashboard-pacient',
    loadComponent: () => import('./components/dashboard-pacient/dashboard-pacient.component')
      .then(m => m.DashboardPacientComponent),
    canActivate: [PacientGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
