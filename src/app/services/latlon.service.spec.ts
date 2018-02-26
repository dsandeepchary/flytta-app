import { TestBed, inject } from '@angular/core/testing';

import { LatlonService } from './latlon.service';

describe('LatlonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LatlonService]
    });
  });

  it('should be created', inject([LatlonService], (service: LatlonService) => {
    expect(service).toBeTruthy();
  }));
});
