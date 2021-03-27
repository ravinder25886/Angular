import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from "../../../_services/authentication.service";
import { ToastService } from "../../../_services/Toast/toast.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  _form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute
    , private router: Router, private toastService: ToastService, private authenticationService: AuthenticationService) 
    { }

  ngOnInit(): void {
    this._form=this.formBuilder.group({
      username: ['',  Validators.email]
    });
  }
  get f() { return this._form.controls; }

  onSubmit() {
    
    if (this._form.valid) {

      this.loading = true;
      this.authenticationService.resetPasswordRequest(this.f.username.value)
        .subscribe((res: any) => {
          if (res.response.isSuccess == true) {
            this.toastService.presentToast('success', 'top-end', res.response.message);

            setTimeout(() => {
              this.router.navigate(['reset-password']);
            }, 1000);
          } else {
            this.loading = false;
            this.toastService.presentToast('error', 'top-end', res.response.message);
          }
        }, error => {
            console.log(error)
            this.loading = false;
          this.toastService.presentToast('error', 'top-end', error.error.response.message);
        })
    }
  }
}
