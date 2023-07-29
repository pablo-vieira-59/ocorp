import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSupplierEditComponent } from './modal-supplier-edit.component';

describe('ModalSupplierEditComponent', () => {
  let component: ModalSupplierEditComponent;
  let fixture: ComponentFixture<ModalSupplierEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSupplierEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSupplierEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
