import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabProductNewComponent } from './tab-product-new.component';

describe('TabProductNewComponent', () => {
  let component: TabProductNewComponent;
  let fixture: ComponentFixture<TabProductNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabProductNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabProductNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
