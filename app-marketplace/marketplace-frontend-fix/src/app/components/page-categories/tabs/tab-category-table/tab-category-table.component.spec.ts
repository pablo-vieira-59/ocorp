import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCategoryTableComponent } from './tab-category-table.component';

describe('TabCategoryTableComponent', () => {
  let component: TabCategoryTableComponent;
  let fixture: ComponentFixture<TabCategoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabCategoryTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabCategoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
