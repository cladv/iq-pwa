import { Component, OnInit, Inject } from '@angular/core';

import { AuthService } from '../../core/auth.service';
import { MaterialModule } from '../../core/material.module';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatSnackBar } from '@angular/material';

//import { UserService } from '../user.service';

import { User } from '../user-model';

import { MAT_DIALOG_DATA } from '@angular/material';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  newUser = new User('', '', '', '', '');
  uid;
  snackMessage;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public authService: AuthService,
    private menuService: AngularFirestore,
    public snackBar: MatSnackBar) {
    console.log(data);
    this.newUser.displayName = data.displayName;
    this.newUser.email = data.email;
    this.newUser.photoURL = data.photoURL;
    this.newUser.company = data.company;
    this.newUser.profile = data.profile;
    this.uid = this.data.uid;
  }

  ngOnInit() {
  }
  changeOne() {
    const user = {
      displayName: this.newUser.displayName,
      email: this.newUser.email,
      photoURL: this.newUser.photoURL,
      company: this.newUser.company,
      profile: this.newUser.profile
    }
    this.menuService.doc('users/' + this.uid).update(user);
    this.snackMessage = 'Usuario actualizado';
    this.openSnackBar();
  }
  openSnackBar() {
    this.snackBar.open(this.snackMessage, '', {
      duration: 1000
    });
  }
}