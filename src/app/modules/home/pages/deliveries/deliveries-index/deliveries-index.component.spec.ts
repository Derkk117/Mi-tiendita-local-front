import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveriesIndexComponent } from './deliveries-index.component';

describe('DeliveriesIndexComponent', () => {
  let component: DeliveriesIndexComponent;
  let fixture: ComponentFixture<DeliveriesIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveriesIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveriesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
