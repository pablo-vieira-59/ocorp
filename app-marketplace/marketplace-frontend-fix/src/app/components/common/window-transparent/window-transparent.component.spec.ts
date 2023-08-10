import { ComponentFixture, TestBed } from '@angular/core/testing';

import WindowTransparentComponent from './window-transparent.component';

describe('WindowTransparentComponent', () => {
  let component: WindowTransparentComponent;
  let fixture: ComponentFixture<WindowTransparentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindowTransparentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WindowTransparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
