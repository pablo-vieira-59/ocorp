import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCategoryNewComponent } from './tab-category-new.component';

describe('TabCategoryNewComponent', () => {
  let component: TabCategoryNewComponent;
  let fixture: ComponentFixture<TabCategoryNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabCategoryNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabCategoryNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
