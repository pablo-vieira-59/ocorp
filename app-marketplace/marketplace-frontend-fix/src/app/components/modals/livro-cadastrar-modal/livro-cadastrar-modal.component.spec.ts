import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroCadastrarModalComponent } from './livro-cadastrar-modal.component';

describe('LivroCadastrarModalComponent', () => {
  let component: LivroCadastrarModalComponent;
  let fixture: ComponentFixture<LivroCadastrarModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivroCadastrarModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivroCadastrarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
