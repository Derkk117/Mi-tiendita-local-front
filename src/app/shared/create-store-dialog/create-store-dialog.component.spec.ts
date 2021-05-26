import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStoreDialogComponent } from './create-store-dialog.component';

describe('CreateStoreDialogComponent', () => {
  let component: CreateStoreDialogComponent;
  let fixture: ComponentFixture<CreateStoreDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateStoreDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStoreDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
