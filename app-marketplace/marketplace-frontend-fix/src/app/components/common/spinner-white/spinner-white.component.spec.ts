import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerWhiteComponent } from './spinner-white.component';

describe('SpinnerWhiteComponent', () => {
  let component: SpinnerWhiteComponent;
  let fixture: ComponentFixture<SpinnerWhiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerWhiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerWhiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
