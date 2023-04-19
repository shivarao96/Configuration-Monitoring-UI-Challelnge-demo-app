import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSelectorComponent } from './common-selector.component';

describe('CommonSelectorComponent', () => {
  let component: CommonSelectorComponent;
  let fixture: ComponentFixture<CommonSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
