import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveriesCreateComponent } from './deliveries-create.component';

describe('DeliveriesCreateComponent', () => {
  let component: DeliveriesCreateComponent;
  let fixture: ComponentFixture<DeliveriesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveriesCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveriesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
