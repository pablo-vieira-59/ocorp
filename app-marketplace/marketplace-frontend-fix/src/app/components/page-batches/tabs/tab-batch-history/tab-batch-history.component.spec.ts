import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabBatchHistoryComponent } from './tab-batch-history.component';

describe('TabBatchHistoryComponent', () => {
  let component: TabBatchHistoryComponent;
  let fixture: ComponentFixture<TabBatchHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabBatchHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabBatchHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
