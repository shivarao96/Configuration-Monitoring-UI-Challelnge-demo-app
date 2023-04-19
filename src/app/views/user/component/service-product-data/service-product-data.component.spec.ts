import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProductDataComponent } from './service-product-data.component';

describe('ServiceProductDataComponent', () => {
  let component: ServiceProductDataComponent;
  let fixture: ComponentFixture<ServiceProductDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceProductDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceProductDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
