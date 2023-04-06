import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSearchBarComponent } from './common-search-bar.component';

describe('CommonSearchBarComponent', () => {
  let component: CommonSearchBarComponent;
  let fixture: ComponentFixture<CommonSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonSearchBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
