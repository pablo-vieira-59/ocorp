import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabBatchEditComponent } from './tab-batch-edit.component';

describe('TabBatchEditComponent', () => {
  let component: TabBatchEditComponent;
  let fixture: ComponentFixture<TabBatchEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabBatchEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabBatchEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
