import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCategoryRegisterComponent } from './modal-category-register.component';

describe('ModalCategoryRegisterComponent', () => {
  let component: ModalCategoryRegisterComponent;
  let fixture: ComponentFixture<ModalCategoryRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCategoryRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCategoryRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
