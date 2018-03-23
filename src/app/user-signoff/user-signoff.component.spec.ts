import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSignoffComponent } from './user-signoff.component';

describe('UserSignoffComponent', () => {
  let component: UserSignoffComponent;
  let fixture: ComponentFixture<UserSignoffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserSignoffComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSignoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
