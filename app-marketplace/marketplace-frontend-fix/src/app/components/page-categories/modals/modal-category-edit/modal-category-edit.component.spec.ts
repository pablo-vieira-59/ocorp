import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCategoryEditComponent } from './modal-category-edit.component';

describe('ModalCategoryEditComponent', () => {
  let component: ModalCategoryEditComponent;
  let fixture: ComponentFixture<ModalCategoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCategoryEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
