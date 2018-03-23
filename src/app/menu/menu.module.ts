import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//import { SharedModule } from '../shared/shared.module';

import { MenuService } from './menu.service';

//import { MenuListComponent } from './menu-list/menu-list.component';
//import { MenuDetailComponent } from './menu-detail/menu-detail.component';

import { AngularFirestoreModule } from 'angularfire2/firestore';
//import { MenuEditComponent } from './menu-edit/menu-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
 //   SharedModule,
    AngularFirestoreModule.enablePersistence(),
  ],
  declarations: [
//    MenuListComponent,
//    MenuDetailComponent,
//  MenuEditComponent
],
  providers: [MenuService],
})
export class MenuModule { }