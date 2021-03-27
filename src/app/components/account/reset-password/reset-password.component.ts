import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from "../../../_services/authentication.service";
import { ToastService } from "../../../_services/Toast/toast.service";
// import custom validator to validate that password and confirm password fields match
import{MustMatch} from '../../_helpers/must-match.validator';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  _form: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute
    , private router: Router, private toastService: ToastService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this._form = this.formBuilder.group({
      code: ['', Validators.required],
      newPassword: ['', [ Validators.required, Validators.minLength(6)]],
      confirmPassword: ['',  [Validators.required, Validators.minLength(6)]]
    }, {
      validator: MustMatch('newPassword', 'confirmPassword')
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this._form.controls; }

  onSubmit() {
    this.submitted = true;
    console.log('confirmPassword onSubmit');
    if (this._form.valid) {
      this.loading = true;
      this.authenticationService.changePassword(this.f.newPassword.value, this.f.confirmPassword.value, this.f.code.value)
        .subscribe((res: any) => {
          if (res.response.isSuccess == true) {
            this.toastService.presentToast('success', 'top-end', res.response.message);

            setTimeout(() => {
              this.router.navigate(['login']);
            }, 1000);
          } else {
            this.toastService.presentToast('error', 'top-end', res.response.message);
          }
        }, error => {
          console.log(error)
          this.toastService.presentToast('error', 'top-end', error.error.response.message);
        })
      

    }
  }
}
