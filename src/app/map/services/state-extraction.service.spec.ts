import { TestBed } from '@angular/core/testing';

import { StateExtractionService } from './state-extraction.service';
import { provideHttpClient } from '@angular/common/http';

describe('StateExtractionService', () => {
  let service: StateExtractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(StateExtractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
