import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthState } from '../services/auth-state';

export const authGuard: CanActivateFn = (route, state) => {
  const authState = inject(AuthState);
  const router = inject(Router);
  const user = authState.token;
  if (user) {
    return true;
  } else {
    router.navigate(['/auth']);
    return false;
  }
};
