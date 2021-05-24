import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CortesCreateComponent } from './cortes-create.component';

describe('CortesCreateComponent', () => {
  let component: CortesCreateComponent;
  let fixture: ComponentFixture<CortesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CortesCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CortesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
