import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatesecurityComponent } from './createsecurity.component';

describe('CreatesecurityComponent', () => {
  let component: CreatesecurityComponent;
  let fixture: ComponentFixture<CreatesecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatesecurityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatesecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
