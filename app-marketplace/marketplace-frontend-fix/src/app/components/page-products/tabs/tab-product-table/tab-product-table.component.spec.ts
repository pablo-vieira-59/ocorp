import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabProductTableComponent } from './tab-product-table.component';

describe('TabProductTableComponent', () => {
  let component: TabProductTableComponent;
  let fixture: ComponentFixture<TabProductTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabProductTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabProductTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
