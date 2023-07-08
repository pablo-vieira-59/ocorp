import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasefieldComponent } from './basefield.component';

describe('BasefieldComponent', () => {
  let component: BasefieldComponent;
  let fixture: ComponentFixture<BasefieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasefieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasefieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
