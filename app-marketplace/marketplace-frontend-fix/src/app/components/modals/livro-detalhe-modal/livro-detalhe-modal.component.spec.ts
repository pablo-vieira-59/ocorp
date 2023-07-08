import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroDetalheModalComponent } from './livro-detalhe-modal.component';

describe('LivroDetalheModalComponent', () => {
  let component: LivroDetalheModalComponent;
  let fixture: ComponentFixture<LivroDetalheModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivroDetalheModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivroDetalheModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
