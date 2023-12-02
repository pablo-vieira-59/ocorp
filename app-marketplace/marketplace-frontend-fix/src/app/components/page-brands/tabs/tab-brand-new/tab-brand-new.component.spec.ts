import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabBrandNewComponent } from './tab-brand-new.component';

describe('TabBrandNewComponent', () => {
  let component: TabBrandNewComponent;
  let fixture: ComponentFixture<TabBrandNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabBrandNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabBrandNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
