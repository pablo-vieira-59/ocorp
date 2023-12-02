import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabEstablishmentNewComponent } from './tab-establishment-new.component';

describe('TabEstablishmentNewComponent', () => {
  let component: TabEstablishmentNewComponent;
  let fixture: ComponentFixture<TabEstablishmentNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabEstablishmentNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabEstablishmentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
