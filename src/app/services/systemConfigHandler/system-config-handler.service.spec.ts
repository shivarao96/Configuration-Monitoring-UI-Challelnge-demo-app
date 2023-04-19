import { TestBed } from '@angular/core/testing';

import { SystemConfigHandlerService } from './system-config-handler.service';

describe('SystemConfigHandlerService', () => {
  let service: SystemConfigHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemConfigHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
