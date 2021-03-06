import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { ReadmePageComponent } from './ui/readme-page/readme-page.component';
import { UserSigninComponent } from '../user-signin/user-signin.component';
import { UserSignupComponent } from '../user-signup/user-signup.component';
import { UserSignoffComponent } from '../user-signoff/user-signoff.component';
import { HomeComponent } from '../home/home.component';
import { MenuListComponent } from '../menu/menu-list/menu-list.component';
import { UserListComponent } from '../user/user-list/user-list.component';
import { ProfileListComponent } from '../profile/profile-list/profile-list.component';
import { CompanyListComponent } from '../company/company-list/company-list.component';

import { AuthGuard } from '../core/auth.guard';
import { CoreModule } from '../core/core.module';

const routes: Routes = [
  //  { path: '', component: ReadmePageComponent },
  { path: 'signin', component: UserSigninComponent },
  { path: 'signup', component: UserSignupComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'signoff', component: UserSignoffComponent, canActivate: [AuthGuard] },
  { path: 'menulist', component: MenuListComponent, canActivate: [AuthGuard] },
  { path: 'userlist', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'profilelist', component: ProfileListComponent, canActivate: [AuthGuard] },
  { path: 'companylist', component: CompanyListComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }