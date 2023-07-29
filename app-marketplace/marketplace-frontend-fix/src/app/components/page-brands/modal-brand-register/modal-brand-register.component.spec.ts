import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBrandRegisterComponent } from './modal-brand-register.component';

describe('ModalBrandRegisterComponent', () => {
  let component: ModalBrandRegisterComponent;
  let fixture: ComponentFixture<ModalBrandRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBrandRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBrandRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
