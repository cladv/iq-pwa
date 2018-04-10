import { Component, OnInit, Inject } from '@angular/core';

import { AuthService } from '../../core/auth.service';
import { MaterialModule } from '../../core/material.module';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatSnackBar } from '@angular/material';

import { Company } from '../company-model';

import { MAT_DIALOG_DATA } from '@angular/material';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {
  newData = new Company();
  uid;
  snackMessage;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public authService: AuthService,
    private menuService: AngularFirestore,
    public snackBar: MatSnackBar) {
      this.newData.clear();
      this.newData.rut = data.rut;
      this.newData.name = data.name;
      this.newData.country = data.country;
      this.newData.logo = data.logo;
      this.newData.isActive = data.isActive;    
      this.uid = this.data.uid;
  }

  ngOnInit() {
  }
  changeOne() {
    const data = {
      rut: this.newData.rut,
      name: this.newData.name,
      country: this.newData.country,
      logo: this.newData.logo,
      isActive: this.newData.isActive
    }
    this.menuService.doc('company/' + this.uid).update(data);
    this.snackMessage = 'Compania actualizada';
    this.openSnackBar();
  }
  openSnackBar() {
    this.snackBar.open(this.snackMessage, '', {
      duration: 1000
    });
  }
}