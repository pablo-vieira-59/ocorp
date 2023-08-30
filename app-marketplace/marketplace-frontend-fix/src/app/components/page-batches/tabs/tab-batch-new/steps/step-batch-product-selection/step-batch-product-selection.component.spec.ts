import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepBatchProductSelectionComponent } from './step-batch-product-selection.component';

describe('StepBatchProductSelectionComponent', () => {
  let component: StepBatchProductSelectionComponent;
  let fixture: ComponentFixture<StepBatchProductSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepBatchProductSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepBatchProductSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
