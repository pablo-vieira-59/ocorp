import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSupplierNewComponent } from './tab-supplier-new.component';

describe('TabSupplierNewComponent', () => {
  let component: TabSupplierNewComponent;
  let fixture: ComponentFixture<TabSupplierNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabSupplierNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabSupplierNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
