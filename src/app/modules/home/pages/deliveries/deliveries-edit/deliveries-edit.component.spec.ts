import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveriesEditComponent } from './deliveries-edit.component';

describe('DeliveriesEditComponent', () => {
  let component: DeliveriesEditComponent;
  let fixture: ComponentFixture<DeliveriesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveriesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveriesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
