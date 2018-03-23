import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Menu } from './menu-model';


import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

interface NewMenu {
  name: string;
  desc: string;
}

@Injectable()
export class MenuService {
  menusCollection: AngularFirestoreCollection<Menu>;
  menuDocument:   AngularFirestoreDocument<Menu>;
  constructor(private afs: AngularFirestore) {
    this.menusCollection = this.afs.collection('menu', (ref) => ref.orderBy('name', 'asc').limit(50));
  }

  getData(): Observable<Menu[]> {
    return this.menusCollection.valueChanges();
  }

  getSnapshot(): Observable<Menu[]> {
    // ['added', 'modified', 'removed']
    return this.menusCollection.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data() as Menu;
        return { id: a.payload.doc.id, name: data.name, desc: data.desc, router: data.router };
      });
    });
  }

  getMenu(id: string) {
    return this.afs.doc<Menu>(`menu/${id}`);
  }

  createMenu(name: string, desc: string) {
    const menu = {
      name: name,
      desc: desc
    };
    return this.afs.collection('menu').add(menu);
  }

  updateMenu(id: string, data: Partial<Menu>) {
    return this.getMenu(id).update(data);
  }

  deleteMenu(id: string) {
    return this.getMenu(id).delete();
  }
}