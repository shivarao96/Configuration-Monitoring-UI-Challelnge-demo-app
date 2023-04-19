import { TestBed } from '@angular/core/testing';

import { LoggerHandlerService } from './logger-handler.service';

describe('LoggerHandlerService', () => {
  let service: LoggerHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
