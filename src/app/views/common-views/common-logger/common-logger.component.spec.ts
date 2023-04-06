import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonLoggerComponent } from './common-logger.component';

describe('CommonLoggerComponent', () => {
  let component: CommonLoggerComponent;
  let fixture: ComponentFixture<CommonLoggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonLoggerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonLoggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
