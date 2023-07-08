import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUserRegisterComponent } from './modal-user-register.component';

describe('ModalUserRegisterComponent', () => {
  let component: ModalUserRegisterComponent;
  let fixture: ComponentFixture<ModalUserRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUserRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
