import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from "../../../_services/authentication.service";
import { ToastService } from "../../../_services/Toast/toast.service";
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error = '';

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute
    , private router: Router, private toastService: ToastService, private authenticationService: AuthenticationService) {
    // redirect to home if already logged in
  }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['',  Validators.email],
      password: ['', Validators.required] 
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

      this.authenticationService.login(this.f.username.value, this.f.password.value)
        .subscribe((res: any) => {
      
          if (res.response.isSuccess == true) {
            localStorage.setItem('userData', JSON.stringify(res.response.data));
           // console.log(res.response.data.token);
            localStorage.setItem('token', res.response.data.token);
            this.toastService.presentToast('success', 'top-end', res.response.message);

            this.router.navigate([ this.returnUrl]);
          } else {
            this.toastService.presentToast('error', 'top-end', res.response.message);
          }
          this.loading = false;
        }, error => {
          console.log(error)
            this.toastService.presentToast('error', 'top-end', error.error.response.message);
            this.loading = false;
        })

       
  }
}
