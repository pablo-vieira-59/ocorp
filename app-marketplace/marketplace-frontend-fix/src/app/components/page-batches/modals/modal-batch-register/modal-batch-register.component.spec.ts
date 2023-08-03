import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBatchRegisterComponent } from './modal-batch-register.component';

describe('ModalBatchRegisterComponent', () => {
  let component: ModalBatchRegisterComponent;
  let fixture: ComponentFixture<ModalBatchRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBatchRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBatchRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
