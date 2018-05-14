import { Component, OnInit, Inject } from '@angular/core';

import { AuthService } from '../../core/auth.service';
import { MaterialModule } from '../../core/material.module';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatSnackBar } from '@angular/material';

import { Profile } from '../profile-model';

import { MAT_DIALOG_DATA } from '@angular/material';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  newDoc = new Profile();
  uid;
  snackMessage;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public authService: AuthService,
    private menuService: AngularFirestore,
    public snackBar: MatSnackBar) {
    console.log(data);
    this.newDoc.name = data.name;
    this.newDoc.desc = data.desc;
    this.newDoc.monitoring = data.monitoring;
    this.newDoc.isActive = data.isActive;    
    this.uid = this.data.uid;
  }

  ngOnInit() {
  }
  changeOne() {
    const data = {
      name: this.newDoc.name,
      desc: this.newDoc.desc,
      monitoring: this.newDoc.monitoring,
      isActive: this.newDoc.isActive
    }
    this.menuService.doc('profile/' + this.uid).update(data);
    this.snackMessage = 'Perfil actualizado';
    this.openSnackBar();
  }
  openSnackBar() {
    this.snackBar.open(this.snackMessage, '', {
      duration: 1000
    });
  }
}