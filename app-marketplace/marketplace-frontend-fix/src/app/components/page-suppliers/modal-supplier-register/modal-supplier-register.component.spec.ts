import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSupplierRegisterComponent } from './modal-supplier-register.component';

describe('ModalSupplierRegisterComponent', () => {
  let component: ModalSupplierRegisterComponent;
  let fixture: ComponentFixture<ModalSupplierRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSupplierRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSupplierRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
