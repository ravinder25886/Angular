import { Component } from '@angular/core';
import { UserLoginData } from './_models/user/UserLoginData';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Service Manager';
 
  constructor(public authenticationService: AuthenticationService) {
   
  }
  logout() {
    this.authenticationService.logout();
  }
}
