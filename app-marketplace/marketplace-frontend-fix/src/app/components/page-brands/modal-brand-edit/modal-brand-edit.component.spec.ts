import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBrandEditComponent } from './modal-brand-edit.component';

describe('ModalBrandEditComponent', () => {
  let component: ModalBrandEditComponent;
  let fixture: ComponentFixture<ModalBrandEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBrandEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBrandEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
