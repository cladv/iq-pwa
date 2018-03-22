import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';


@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.scss']
})
export class UserSigninComponent implements OnInit {
  email;
  password;
  hide = true;
  showSpinner: boolean = false;
  constructor(public auth: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit(formData) {
    if (formData.valid) {
      this.showSpinner = true;
      console.log(formData.value);
      this.auth.emailLogin(
        formData.value.email,
        formData.value.password
      );
      setTimeout(() => {
        this.showSpinner = false;
      }, 2000);
    }
  }
  signInEmail() {
    this.auth.emailLogin(this.email, this.password)
    .then(() => this.afterSignIn());
  }
  /// Social Login
 signInWithGithub() {
  this.auth.githubLogin()
  .then(() => this.afterSignIn());
}

signInWithGoogle() {
  this.auth.googleLogin()
    .then(() => this.afterSignIn());
}

signInWithFacebook() {
  this.auth.facebookLogin()
    .then(() => this.afterSignIn());
}

signInWithTwitter() {
  this.auth.twitterLogin()
    .then(() => this.afterSignIn());
}

/// Anonymous Sign In
signInAnonymously() {
  this.auth.anonymousLogin()
    .then(() => this.afterSignIn());
}

/// Shared
private afterSignIn() {
  // Do after login stuff here, such router redirects, toast messages, etc.
  //this.router.navigate(['/']);
}
}
