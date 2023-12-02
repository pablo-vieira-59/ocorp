import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabBrandTableComponent } from './tab-brand-table.component';

describe('TabBrandTableComponent', () => {
  let component: TabBrandTableComponent;
  let fixture: ComponentFixture<TabBrandTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabBrandTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabBrandTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
