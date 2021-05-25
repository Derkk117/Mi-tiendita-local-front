import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CortesEditComponent } from './cortes-edit.component';

describe('CortesEditComponent', () => {
  let component: CortesEditComponent;
  let fixture: ComponentFixture<CortesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CortesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CortesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
