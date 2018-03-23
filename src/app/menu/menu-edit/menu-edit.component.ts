import { Component, OnInit, Inject} from '@angular/core';

import { AuthService } from '../../core/auth.service';
import { MaterialModule } from '../../core/material.module';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatSnackBar } from '@angular/material';

import { MenuService } from '../menu.service';

import { Menu } from '../menu-model';

import { MAT_DIALOG_DATA } from '@angular/material';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss']
})
export class MenuEditComponent implements OnInit {
  newMenu = new Menu('', '', '');
  uid;
  snackMessage;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public authService: AuthService,
    private menuService: AngularFirestore,
    public snackBar: MatSnackBar) { 
     this.newMenu.name = data.name;
     this.newMenu.desc = data.desc;
     this.newMenu.router = data.router;
     this.uid = this.data.uid;
    }

  ngOnInit() {
  }
  changeOne() {
    const menu = {
      name: this.newMenu.name,
      desc: this.newMenu.desc,
      router: this.newMenu.router
    };
    this.menuService.doc('menu/' + this.uid).update(menu);
    this.snackMessage = 'Menu actualizado';
    this.openSnackBar();
  }
  openSnackBar() {
    this.snackBar.open(this.snackMessage, '', {
      duration: 1000
    });
  }
}
