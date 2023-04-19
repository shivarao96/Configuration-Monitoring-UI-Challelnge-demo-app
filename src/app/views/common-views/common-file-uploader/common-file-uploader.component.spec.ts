import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonFileUploaderComponent } from './common-file-uploader.component';

describe('CommonFileUploaderComponent', () => {
  let component: CommonFileUploaderComponent;
  let fixture: ComponentFixture<CommonFileUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonFileUploaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonFileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
