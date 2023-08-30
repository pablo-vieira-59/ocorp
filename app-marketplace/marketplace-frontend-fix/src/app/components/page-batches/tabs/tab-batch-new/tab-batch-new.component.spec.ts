import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabBatchNewComponent } from './tab-batch-new.component';

describe('TabBatchNewComponent', () => {
  let component: TabBatchNewComponent;
  let fixture: ComponentFixture<TabBatchNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabBatchNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabBatchNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
