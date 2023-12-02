import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabUserNewComponent } from './tab-user-new.component';

describe('TabUserNewComponent', () => {
  let component: TabUserNewComponent;
  let fixture: ComponentFixture<TabUserNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabUserNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabUserNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
