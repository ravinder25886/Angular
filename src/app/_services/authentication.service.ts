import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import {APIEndPointsService} from '../core/APIEndPoints';

import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { UserLoginData, UserLoginResponse } from '../_models/user/UserLoginData';
import { LoginRequest } from '../_models/user/LoginRequest';
import { ToastService } from './Toast/toast.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userSubject: BehaviorSubject<UserLoginData>;
  public loginRequest:Observable<LoginRequest>;

  constructor(private router: Router, private httpClient: HttpClient, private toastService: ToastService,private api:APIEndPointsService)
    {
      //this.userSubject = new BehaviorSubject<UserLoginData>(JSON.parse(localStorage.getItem('userData')|| '{}'));
       // this.loginRequest = this.userSubject.asObservable();

    }

  public get userValue(): UserLoginData{
    this.userSubject = new BehaviorSubject<UserLoginData>(JSON.parse(localStorage.getItem('userData') || '{}'));
        return this.userSubject.value;
  }
  public get isLoggedIn(): boolean {
    var token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    if (token != '') {
      return true;
    }
    return false;
  }
  login(username: string, password: string): Observable <any>{
    return this.httpClient.post(this.api.Login, { username, password });
   }
  loginM(username: string, password: string): Observable<UserLoginResponse> {
    return this.httpClient.post <UserLoginResponse>(this.api.Login, { username, password }).pipe(
      map((res: UserLoginResponse) => {
        if (res.isSuccess) {
          this.toastService.presentToast('success', 'top-end', res.message);
        }
        return res;
      }), catchError(error => {
        return throwError('Something went wrong!');
      })
    );
  }

  logout() {
   // this.httpClient.post<any>(this.api.Logout, {}, { withCredentials: true }).subscribe();
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  resetPasswordRequest(userName:string): Observable<any> {
    return this.httpClient.post(this.api.RestPassword, { userName });
  }

  changePassword(password: string, confirmPassword: string, code: string): Observable<any> {
    return this.httpClient.post(this.api.ChangePassword, { password, confirmPassword,code});
      }
}
