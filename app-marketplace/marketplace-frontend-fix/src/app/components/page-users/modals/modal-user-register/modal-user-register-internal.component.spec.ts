import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUserRegisterInternalComponent } from './modal-user-register-internal.component';

describe('ModalUserRegisterComponent', () => {
  let component: ModalUserRegisterInternalComponent;
  let fixture: ComponentFixture<ModalUserRegisterInternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUserRegisterInternalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUserRegisterInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
