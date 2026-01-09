import { HttpInterceptorFn } from '@angular/common/http';
import { AuthState } from '../services/auth-state';
import { inject } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authState = inject(AuthState);

  if (!authState.token) return next(req);

  const cloned = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authState.token}`,
    },
  });

  return next(cloned);
};
