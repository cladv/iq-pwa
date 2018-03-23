import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { AuthService } from '../../core/auth.service';
import { MaterialModule } from '../../core/material.module';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatSnackBar } from '@angular/material';

import { DialogDeleteComponent } from '../../ui/dialog-delete/dialog-delete.component';
import { MenuService } from '../menu.service';
import { Menu } from '../menu-model';
import { MenuEditComponent } from '../menu-edit/menu-edit.component';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements AfterViewInit {
  newMenu = new Menu('', '', '');
  snackMessage;
  displayedColumns = ['name', 'desc', 'edit', 'delete'];
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
      this.afs.collection<Menu>('menu').snapshotChanges().map((actions) => {
        return actions.map((a) => {
//        const data = a.payload.doc.data() as any;
        const data = a.payload.doc.data() as Menu;
        return { id: a.payload.doc.id, name: data.name, desc: data.desc, router: data.router };
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
    const menu = {
      name: this.newMenu.name,
      desc: this.newMenu.desc,
      route: this.newMenu.router
    }
    this.afs.collection('menu').add(menu).then(ref => {
      console.log('Added document with ID: ', ref.id);
      this.snackMessage = 'Menu creado exitosamente';
      this.openSnackBar();
      this.newMenu.name = '';
      this.newMenu.desc = '';
      this.newMenu.router = '';
    });
  }
  deleteOne(data) {
    console.log(data);
    this.afs.doc('menu/' + data.id).delete().then(() => {
      console.log('deleted');
    })
  }

  openDialogEdit(data): void {
    const dialogRef = this.dialog.open(MenuEditComponent, {
      width: '350px',
      data: { uid: data.id, name: data.name, desc: data.desc, router: data.router }
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
        this.snackMessage = 'Menu Eliminado!';
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
