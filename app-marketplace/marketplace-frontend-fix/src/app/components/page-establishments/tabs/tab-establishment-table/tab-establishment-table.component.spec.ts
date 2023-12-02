import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabEstablishmentTableComponent } from './tab-establishment-table.component';

describe('TabEstablishmentTableComponent', () => {
  let component: TabEstablishmentTableComponent;
  let fixture: ComponentFixture<TabEstablishmentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabEstablishmentTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabEstablishmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
