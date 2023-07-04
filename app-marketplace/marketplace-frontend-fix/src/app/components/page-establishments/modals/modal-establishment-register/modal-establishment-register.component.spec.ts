import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEstablishmentRegisterComponent } from './modal-establishment-register.component';

describe('ModalEstablishmentRegisterComponent', () => {
  let component: ModalEstablishmentRegisterComponent;
  let fixture: ComponentFixture<ModalEstablishmentRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEstablishmentRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEstablishmentRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
