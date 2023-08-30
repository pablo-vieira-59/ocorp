import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepBatchSupplierSelectionComponent } from './step-batch-supplier-selection.component';

describe('StepBatchSupplierSelectionComponent', () => {
  let component: StepBatchSupplierSelectionComponent;
  let fixture: ComponentFixture<StepBatchSupplierSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepBatchSupplierSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepBatchSupplierSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
