import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { APIEndPointsService } from '../../core/APIEndPoints';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private router: Router, private httpClient: HttpClient, private api: APIEndPointsService) { }

  getBusinessType(): Observable<any> {
    return this.httpClient.get(this.api.GetBusinessType);
  }
  //GetCallHistoryByAgentId() {
  //  return this.httpClient.get(this.api.GetBusinessType )
  //    .pipe((data => { return data; }))
  //}
}
