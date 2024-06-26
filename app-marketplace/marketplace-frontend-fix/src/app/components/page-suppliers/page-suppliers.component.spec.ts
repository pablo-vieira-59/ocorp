import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSuppliersComponent } from './page-suppliers.component';

describe('PageSuppliersComponent', () => {
  let component: PageSuppliersComponent;
  let fixture: ComponentFixture<PageSuppliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageSuppliersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
