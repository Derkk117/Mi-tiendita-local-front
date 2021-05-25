import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriesIndexComponent } from './histories-index.component';

describe('HistoriesIndexComponent', () => {
  let component: HistoriesIndexComponent;
  let fixture: ComponentFixture<HistoriesIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriesIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
