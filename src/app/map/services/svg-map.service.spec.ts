import { TestBed } from '@angular/core/testing';

import { SvgMapService } from './svg-map.service';
import { provideHttpClient } from '@angular/common/http';

describe('SvgMapService', () => {
  let service: SvgMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(SvgMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
