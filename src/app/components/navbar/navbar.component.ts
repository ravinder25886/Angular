import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  //isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(public authenticationService: AuthenticationService) { }
  
  ngOnInit(): void {
  
  }
  logout() {
    this.authenticationService.logout();
  }
}
