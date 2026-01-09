import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthState {
  private _token: string | null = null;
  private readonly TOKEN_KEY = 'auth_token';

  constructor() {
    const storedToken = localStorage.getItem(this.TOKEN_KEY);
    if (storedToken) {
      this._token = storedToken;
    }
  }

  get token(): string | null {
    return this._token;
  }

  set token(value: string | null) {
    this._token = value;

    if (value) {
      localStorage.setItem(this.TOKEN_KEY, value);
    } else {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  clearToken(): void {
    this.token = null;
  }
}
