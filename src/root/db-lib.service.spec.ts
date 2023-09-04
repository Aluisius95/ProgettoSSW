import { TestBed } from '@angular/core/testing';

import { DblibService } from './db-lib.service';

describe('DbLibService', () => {
  let service: DblibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DblibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
