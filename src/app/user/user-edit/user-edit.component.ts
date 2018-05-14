import { Component, OnInit, Inject } from '@angular/core';

import { AuthService } from '../../core/auth.service';
import { MaterialModule } from '../../core/material.module';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatSnackBar } from '@angular/material';

import { User } from '../user-model';

import { MAT_DIALOG_DATA } from '@angular/material';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  newDoc = new User();
  uid;
  snackMessage;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public authService: AuthService,
    private menuService: AngularFirestore,
    public snackBar: MatSnackBar) {
    console.log(data);
    this.newDoc.clear();
    this.newDoc.displayName = data.displayName;
    this.newDoc.email = data.email;
    this.newDoc.photoURL = data.photoURL;
    this.newDoc.company = data.company;
    this.newDoc.profile = data.profile;
    this.uid = this.data.uid;
  }

  ngOnInit() {
  }
  changeOne() {
    const user = {
      displayName: this.newDoc.displayName,
      email: this.newDoc.email,
      photoURL: this.newDoc.photoURL,
      company: this.newDoc.company,
      profile: this.newDoc.profile
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