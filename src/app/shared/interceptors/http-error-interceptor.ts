import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Toast } from '../services/toast';
import { catchError, throwError } from 'rxjs';
import { ApiErrorDetails, ApiResponse } from '../models/interfaces';
import { AuthState } from '../services/auth-state';
import { Auth } from 'src/app/auth/services/auth';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(Toast);
  const authService = inject(Auth);
  return next(req).pipe(
    catchError((err) => {
      if (err.status === 0) {
        toastService.error('Network error! Please check your connection.');
      } else {
        const apiError = err.error as ApiResponse<ApiErrorDetails>;
        if (apiError && apiError.message === 'Unauthorized or invalid JWT') {
          authService.logout();
        }

        if (apiError?.data) {
          const details = apiError.data;
          toastService.error(details.message || apiError.message);

          if (details.errors) {
            Object.values(details.errors).forEach((msg) => {
              toastService.error(msg);
            });
          }
        } else {
          toastService.error(apiError?.message || 'Something went wrong on the server.');
        }
      }

      return throwError(() => err);
    }),
  );
};
