import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutUsersComponent } from './logout-users.component';

describe('LogoutUsersComponent', () => {
  let component: LogoutUsersComponent;
  let fixture: ComponentFixture<LogoutUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
