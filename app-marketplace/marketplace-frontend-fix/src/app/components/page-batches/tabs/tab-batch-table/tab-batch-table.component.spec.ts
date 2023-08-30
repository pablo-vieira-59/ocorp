import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabBatchTableComponent } from './tab-batch-table.component';

describe('TabBatchTableComponent', () => {
  let component: TabBatchTableComponent;
  let fixture: ComponentFixture<TabBatchTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabBatchTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabBatchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
