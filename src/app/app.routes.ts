import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { authGuard } from './shared/guards/auth-guard';
import { nonAuthGuard } from './shared/guards/non-auth-guard';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'number-login',
        loadComponent: () =>
          import('./auth/number-login/number-login.page').then((m) => m.NumberLoginPage),
      },
      {
        path: 'verify-otp',
        loadComponent: () =>
          import('./auth/otp-verification/otp-verification.page').then(
            (m) => m.OtpVerificationPage,
          ),
      },
      {
        path: '',
        redirectTo: '/auth/number-login',
        pathMatch: 'full',
      },
    ],
    canActivate: [nonAuthGuard],
  },
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'parties',
        loadComponent: () => import('./home/pages/parties/parties.page').then((m) => m.PartiesPage),
      },
      {
        path: 'bills',
        loadComponent: () => import('./home/pages/bills/bills.page').then((m) => m.BillsPage),
      },
      {
        path: 'items',
        loadComponent: () => import('./home/pages/items/items.page').then((m) => m.ItemsPage),
      },
      {
        path: '',
        redirectTo: '/home/parties',
        pathMatch: 'full',
      },
    ],
    canActivate: [authGuard],
  },
  {
    path: 'pages',
    children: [
      {
        path: 'add-party',
        loadComponent: () => import('./pages/add-party/add-party.page').then((m) => m.AddPartyPage),
      },
      {
        path: 'party-details/:id',
        loadComponent: () =>
          import('./pages/party-details/party-details.page').then((m) => m.PartyDetailsPage),
      },
      {
        path: 'bill-details/:id',
        loadComponent: () =>
          import('./pages/bill-details/bill-details.page').then((m) => m.BillDetailsPage),
      },
      {
        path: 'add-bill',
        loadComponent: () => import('./pages/add-bill/add-bill.page').then((m) => m.AddBillPage),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
