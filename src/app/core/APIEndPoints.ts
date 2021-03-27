import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APIEndPointsService {
  /* User login */
  Login: string = environment.apiUrl + 'Login';
  Logout = environment.apiUrl + "revoke-token";
  RestPassword: string = environment.apiUrl + 'Login/SendRestPasswordVerificationCode';
  ChangePassword: string = environment.apiUrl + 'Login/ChangePassword'; 

  GetBusinessType: string = environment.apiUrl + 'BusinessType'; 
  constructor() { }
}
