import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareLincenseManagementList } from './software-lincense-management-list';

describe('SoftwareLincenseManagementList', () => {
  let component: SoftwareLincenseManagementList;
  let fixture: ComponentFixture<SoftwareLincenseManagementList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftwareLincenseManagementList],
    }).compileComponents();

    fixture = TestBed.createComponent(SoftwareLincenseManagementList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
