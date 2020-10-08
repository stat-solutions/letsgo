import { TestBed } from '@angular/core/testing';

import { UserToProveService } from './user-to-prove.service';

describe('UserToProveService', () => {
  let service: UserToProveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserToProveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
