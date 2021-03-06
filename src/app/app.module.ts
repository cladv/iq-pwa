import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './core/app-routing.module';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './core/material.module';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
export const firebaseConfig = environment.firebase;
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { UserSigninComponent } from './user-signin/user-signin.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { UserSignoffComponent } from './user-signoff/user-signoff.component';
import { HomeComponent } from './home/home.component';

import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { MenuEditComponent } from './menu/menu-edit/menu-edit.component';
import { TopNavComponent } from './ui/top-nav/top-nav.component';
import { NotificationMessageComponent } from './ui/notification-message/notification-message.component';
import { FooterNavComponent } from './ui/footer-nav/footer-nav.component';
import { DialogDeleteComponent } from './ui/dialog-delete/dialog-delete.component';
import { SideNavComponent } from './ui/side-nav/side-nav.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { ProfileListComponent } from './profile/profile-list/profile-list.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    UserSigninComponent,
    UserSignupComponent,
    UserSignoffComponent,
    HomeComponent,
    MenuListComponent,
    MenuEditComponent,
    TopNavComponent,
    NotificationMessageComponent,
    FooterNavComponent,
    DialogDeleteComponent,
    SideNavComponent,
    UserListComponent,
    UserEditComponent,
    ProfileListComponent,
    ProfileEditComponent,
    CompanyListComponent,
    CompanyEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    CoreModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  entryComponents: [DialogDeleteComponent, MenuEditComponent, UserEditComponent, ProfileEditComponent, CompanyEditComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
