import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemPropertyHandlerComponent } from './system-property-handler.component';

describe('SystemPropertyHandlerComponent', () => {
  let component: SystemPropertyHandlerComponent;
  let fixture: ComponentFixture<SystemPropertyHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemPropertyHandlerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemPropertyHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
