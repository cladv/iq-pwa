import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { AuthService } from '../../core/auth.service';
import { MaterialModule } from '../../core/material.module';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatSnackBar } from '@angular/material';

import { DialogDeleteComponent } from '../../ui/dialog-delete/dialog-delete.component';
//import { MenuService } from '../menu.service';
import { Profile } from '../profile-model';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements AfterViewInit {
  newData = new Profile();
  snackMessage;
  displayedColumns = ['name', 'desc', 'monitoring', 'isActive', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public authService: AuthService,
    private afs: AngularFirestore,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) {
  }

  ngAfterViewInit() {
    this.afs.collection<Profile>('profile').snapshotChanges().map((actions) => {
      return actions.map((a) => {
        //const data = a.payload.doc.data() as any;
        const data = a.payload.doc.data() as Profile;
        return { 
          id: a.payload.doc.id, 
          name: data.name, 
          desc: data.desc, 
          monitoring: data.monitoring,
          isActive: data.isActive
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
    const profile = {
      name: this.newData.name,
      desc: this.newData.desc,
      createDT: Date.now(),
      monitoring: 0,
      isActive: true,
    }
    this.afs.collection('profile').add(profile).then(ref => {
      console.log('Added document with ID: ', ref.id);
      this.snackMessage = 'Perfil creado exitosamente';
      this.openSnackBar();
      this.newData.clear();
    });
  }
  deleteOne(data) {
    console.log(data);
    this.afs.doc('profile/' + data.id).delete().then(() => {
    })
  }

  openDialogEdit(data): void {
    const dialogRef = this.dialog.open(ProfileEditComponent, {
      width: '350px',
      data: { uid: data.id, 
              name: data.name, 
              desc: data.desc, 
              monitoring: data.monitoring,
              isActive: data.isActive
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
        this.snackMessage = 'Perfil Eliminado!';
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
