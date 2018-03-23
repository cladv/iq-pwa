
import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { AuthService } from '../../core/auth.service';
import { MaterialModule } from '../../core/material.module';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatSnackBar } from '@angular/material';

import { DialogDeleteComponent } from '../../ui/dialog-delete/dialog-delete.component';
//import { MenuService } from '../menu.service';
import { User } from '../user-model';
import { UserEditComponent } from '../user-edit/user-edit.component';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements AfterViewInit {
  newUser = new User('', '', '', '', '');
  snackMessage;
  displayedColumns = ['displayName', 'company', 'profile', 'email', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public authService: AuthService,
    private afs: AngularFirestore,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) {
  }

  ngAfterViewInit() {
    //    this.afs.collection<any>('menu').snapshotChanges().map((actions) => {
    this.afs.collection<User>('users').snapshotChanges().map((actions) => {
      return actions.map((a) => {
        //        const data = a.payload.doc.data() as any;
        const data = a.payload.doc.data() as User;
        return { 
          id: a.payload.doc.id, 
          displayName: data.displayName, 
          email: data.email, 
          photoURL: data.photoURL,
          company: data.company,
          profile: data.profile,
        };
      });
    }).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      console.log(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  addOne() {
    const user = {
      displayName: this.newUser.displayName,
      email: this.newUser.email,
      photoURL: this.newUser.photoURL,
      company: this.newUser.company,
      profile: this.newUser.profile
    }
    this.afs.collection('users').add(user).then(ref => {
      console.log('Added document with ID: ', ref.id);
      this.snackMessage = 'Menu creado exitosamente';
      this.openSnackBar();
      this.newUser.displayName = '';
      this.newUser.email = '';
      this.newUser.photoURL = '';
      this.newUser.company = '';
      this.newUser.profile = '';
    });
  }
  deleteOne(data) {
    console.log(data);
    this.afs.doc('users/' + data.id).delete().then(() => {
    })
  }

  openDialogEdit(data): void {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '350px',
      data: { uid: data.id, 
              displayName: data.displayName, 
              email: data.email, 
              photoURL: data.photoURL,
              company: data.company,
              profile: data.profile,
            }
    });
  }

  openDialogDelete(data): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '350px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.deleteOne(data);
        this.snackMessage = 'User Eliminado!';
        this.openSnackBar();
      }
    });
  }

  openSnackBar() {
    this.snackBar.open(this.snackMessage, '', {
      duration: 1000
    });
  }

  trackByUid(index, item) {
    return item.uid
  }

}
