import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonWaitPageComponent } from './common-wait-page.component';

describe('CommonWaitPageComponent', () => {
  let component: CommonWaitPageComponent;
  let fixture: ComponentFixture<CommonWaitPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonWaitPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonWaitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
