import { Component, OnInit } from '@angular/core';
// for auth
import { AuthService } from '../core/auth.service';
// for Observables
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent implements OnInit {
  email;
  password;
  state: string = '';
  error: any;

  constructor(private auth: AuthService, private router: Router) {

  }

  onSubmit(formData) {
    if (formData.valid) {
      this.auth.emailSignUp(formData.value['email'], formData.value['password'])
        .then((success) => {
          console.log("mmm" + success);
          //        this.router.navigate(['/'])
        })
        .catch(
          (err) => {
            this.error = err;
          })
    }
  }

  ngOnInit() {
  }
}