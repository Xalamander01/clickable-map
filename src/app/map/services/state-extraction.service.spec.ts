import { TestBed } from '@angular/core/testing';

import { StateExtractionService } from './state-extraction.service';

describe('StateExtractionService', () => {
  let service: StateExtractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateExtractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
