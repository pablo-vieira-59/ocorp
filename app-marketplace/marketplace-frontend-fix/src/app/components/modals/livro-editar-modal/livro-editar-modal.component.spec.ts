import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroEditarModalComponent } from './livro-editar-modal.component';

describe('LivroEditarModalComponent', () => {
  let component: LivroEditarModalComponent;
  let fixture: ComponentFixture<LivroEditarModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivroEditarModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivroEditarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
