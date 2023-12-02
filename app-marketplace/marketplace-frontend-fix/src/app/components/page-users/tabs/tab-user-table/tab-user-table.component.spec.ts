import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabUserTableComponent } from './tab-user-table.component';

describe('TabUserTableComponent', () => {
  let component: TabUserTableComponent;
  let fixture: ComponentFixture<TabUserTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabUserTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabUserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
