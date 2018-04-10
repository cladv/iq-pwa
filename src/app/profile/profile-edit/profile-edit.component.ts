import { Component, OnInit, Inject } from '@angular/core';

import { AuthService } from '../../core/auth.service';
import { MaterialModule } from '../../core/material.module';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatSnackBar } from '@angular/material';

//import { UserService } from '../user.service';

import { Profile } from '../profile-model';

import { MAT_DIALOG_DATA } from '@angular/material';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  newData = new Profile();
  uid;
  snackMessage;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public authService: AuthService,
    private menuService: AngularFirestore,
    public snackBar: MatSnackBar) {
    console.log(data);
    this.newData.name = data.name;
    this.newData.desc = data.desc;
    this.newData.monitoring = data.monitoring;
    this.newData.isActive = data.isActive;    
    this.uid = this.data.uid;
  }

  ngOnInit() {
  }
  changeOne() {
    const data = {
      name: this.newData.name,
      desc: this.newData.desc,
      monitoring: this.newData.monitoring,
      isActive: this.newData.isActive
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