import { TestBed } from '@angular/core/testing';

import { ApibookService } from './apibook.service';

describe('ApibookService', () => {
  let service: ApibookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApibookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
