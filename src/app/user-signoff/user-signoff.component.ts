import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-user-signoff',
  templateUrl: './user-signoff.component.html',
  styleUrls: ['./user-signoff.component.scss']
})
export class UserSignoffComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }
  signOut() {
    this.auth.signOut();
  }
}
