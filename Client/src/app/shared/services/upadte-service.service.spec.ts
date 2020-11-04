import { TestBed } from '@angular/core/testing';

import { UpadteServiceService } from './upadte-service.service';

describe('UpadteServiceService', () => {
  let service: UpadteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpadteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
