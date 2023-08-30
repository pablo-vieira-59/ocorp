import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepBatchAddressSelectionComponent } from './step-batch-address-selection.component';

describe('StepBatchAddressSelectionComponent', () => {
  let component: StepBatchAddressSelectionComponent;
  let fixture: ComponentFixture<StepBatchAddressSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepBatchAddressSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepBatchAddressSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
