import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NavController } from '@ionic/angular/standalone';
import { Observable, tap } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/interfaces';
import { AuthState } from 'src/app/shared/services/auth-state';
import { environment } from 'src/environments/environment.prod';
import { OtpResponse, VerifyOtpRequest, VerifyOtpResponse } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private authStateService = inject(AuthState);
  private navController = inject(NavController);

  private apiUrl: string = environment.apiUrl + 'auth';

  requestOtp(contactNumber: string): Observable<ApiResponse<OtpResponse>> {
    return this.http.post<ApiResponse<OtpResponse>>(`${this.apiUrl}/request-otp`, {
      contactNumber,
    });
  }

  verifyOtp(payload: VerifyOtpRequest): Observable<ApiResponse<VerifyOtpResponse>> {
    return this.http
      .post<ApiResponse<VerifyOtpResponse>>(`${this.apiUrl}/verify-otp`, payload)
      .pipe(
        tap((response) => {
          const token = response.data.token;
          if (token) {
            this.authStateService.token = token;
          }
        }),
      );
  }

  resendOtp(contactNumber: string): Observable<ApiResponse<OtpResponse>> {
    return this.http.post<ApiResponse<OtpResponse>>(`${this.apiUrl}/resend-otp`, { contactNumber });
  }

  logout() {
    this.authStateService.clearToken();
    this.navController.navigateRoot(['/auth/number-login']);
  }
}
