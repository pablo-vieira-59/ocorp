import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEstablishmentsComponent } from './page-establishments.component';

describe('PageEstablishmentsComponent', () => {
  let component: PageEstablishmentsComponent;
  let fixture: ComponentFixture<PageEstablishmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageEstablishmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageEstablishmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
