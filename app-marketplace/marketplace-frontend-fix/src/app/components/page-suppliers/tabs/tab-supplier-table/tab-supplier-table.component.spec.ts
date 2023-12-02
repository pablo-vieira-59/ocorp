import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSupplierTableComponent } from './tab-supplier-table.component';

describe('TabSupplierTableComponent', () => {
  let component: TabSupplierTableComponent;
  let fixture: ComponentFixture<TabSupplierTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabSupplierTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabSupplierTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
