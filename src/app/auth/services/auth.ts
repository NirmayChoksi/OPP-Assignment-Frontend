import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl: string = environment.apiUrl + 'auth'

  
}
