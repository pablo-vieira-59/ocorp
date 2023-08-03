import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBatchEditComponent } from './modal-batch-edit.component';

describe('ModalBatchEditComponent', () => {
  let component: ModalBatchEditComponent;
  let fixture: ComponentFixture<ModalBatchEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBatchEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBatchEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
