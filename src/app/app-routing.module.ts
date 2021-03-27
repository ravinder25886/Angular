import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';


import { BusinessInfoComponent } from './components/business-info/business-info.component';
import { LogInComponent } from './components/account/log-in/log-in.component';
import { ForgotPasswordComponent } from './components/account/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/account/reset-password/reset-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
//const accountModule = () => import('./././components/account/account.module').then(x => x.AccountModule);
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {path:'login',component:LogInComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'business-info', component: BusinessInfoComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
