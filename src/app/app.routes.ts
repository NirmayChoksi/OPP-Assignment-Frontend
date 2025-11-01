import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    children: [
      {
        path: 'number-login',
        loadComponent: () => import('./auth/number-login/number-login.page').then(m => m.NumberLoginPage)
      },
      {
        path: 'verify-otp',
        loadComponent: () => import('./auth/otp-verification/otp-verification.page').then(m => m.OtpVerificationPage)
      },

    ]
  }
];
