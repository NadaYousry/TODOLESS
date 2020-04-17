import { TestBed } from '@angular/core/testing';

import { ToggleasideService } from './toggleaside.service';

describe('ToggleasideService', () => {
  let service: ToggleasideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToggleasideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
