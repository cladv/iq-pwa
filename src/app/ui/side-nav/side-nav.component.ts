import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { MaterialModule } from '../../core/material.module';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  constructor(public auth: AuthService) { 
  }

  ngOnInit() {
  }

}
