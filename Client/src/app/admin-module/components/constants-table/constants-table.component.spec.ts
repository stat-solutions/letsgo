import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstantsTableComponent } from './constants-table.component';

describe('ConstantsTableComponent', () => {
  let component: ConstantsTableComponent;
  let fixture: ComponentFixture<ConstantsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstantsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstantsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
