import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProfilesComponent } from './page-profiles.component';

describe('PageProfilesComponent', () => {
  let component: PageProfilesComponent;
  let fixture: ComponentFixture<PageProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageProfilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
