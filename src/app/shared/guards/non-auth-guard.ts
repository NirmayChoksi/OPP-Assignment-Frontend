import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { NavController } from '@ionic/angular/standalone';
import { Auth } from 'src/app/auth/services/auth';
import { AuthState } from '../services/auth-state';

export const nonAuthGuard: CanActivateFn = (route, state) => {
  const authStateService = inject(AuthState);
  const navController = inject(NavController);
  const token = authStateService.token;
  if (token) {
    navController.navigateRoot(['/home']);
    return false;
  }
  return true;
};
