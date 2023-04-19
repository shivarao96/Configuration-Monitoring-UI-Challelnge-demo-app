import { TestBed } from '@angular/core/testing';

import { ThrobberHandlerService } from './throbber-handler.service';

describe('ThrobberHandlerService', () => {
  let service: ThrobberHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThrobberHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
