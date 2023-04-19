import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonThrobberComponent } from './common-throbber.component';

describe('CommonThrobberComponent', () => {
  let component: CommonThrobberComponent;
  let fixture: ComponentFixture<CommonThrobberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonThrobberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonThrobberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
