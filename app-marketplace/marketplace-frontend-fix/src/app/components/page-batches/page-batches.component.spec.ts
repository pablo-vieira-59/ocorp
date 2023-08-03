import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBatchesComponent } from './page-batches.component';

describe('PageBatchesComponent', () => {
  let component: PageBatchesComponent;
  let fixture: ComponentFixture<PageBatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageBatchesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
