import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { AuthService } from '../../core/auth.service';
import { MaterialModule } from '../../core/material.module';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatSnackBar } from '@angular/material';

import { DialogDeleteComponent } from '../../ui/dialog-delete/dialog-delete.component';
//import { MenuService } from '../menu.service';
import { Company } from '../company-model';
import { CompanyEditComponent } from '../company-edit/company-edit.component';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements AfterViewInit {
  newDoc = new Company();
  snackMessage;
  displayedColumns = ['rut', 'name', 'country', 'isActive', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public authService: AuthService,
    private afs: AngularFirestore,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) {
  }

  ngAfterViewInit() {
    this.afs.collection<Company>('company').snapshotChanges().map((actions) => {
      return actions.map((a) => {
        //const data = a.payload.doc.data() as any;
        const data = a.payload.doc.data() as Company;
        return { 
          id: a.payload.doc.id, 
          rut: data.rut,
          name: data.name,  
          country: data.country,
          logo: data.logo,
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
      rut: this.newDoc.rut,
      name: this.newDoc.name,
      country: this.newDoc.country,
      logo: '',
      isActive: true,
      createDT: Date.now(),
    }
    this.afs.collection('company').add(profile).then(ref => {
      console.log('Added document with ID: ', ref.id);
      this.snackMessage = 'Compania creada exitosamente';
      this.openSnackBar();
      this.newDoc.clear();
    });
  }
  deleteOne(data) {
    console.log(data);
    this.afs.doc('company/' + data.id).delete().then(() => {
    })
  }

  openDialogEdit(data): void {
    const dialogRef = this.dialog.open(CompanyEditComponent, {
      width: '350px',
      data: { uid: data.id, 
              rut: data.rut, 
              name: data.name, 
              country: data.country,
              logo: data.logo,
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
        this.snackMessage = 'Compania Eliminada!';
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
