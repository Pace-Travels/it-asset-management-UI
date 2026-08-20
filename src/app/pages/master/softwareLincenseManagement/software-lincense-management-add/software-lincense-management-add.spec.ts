import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareLincenseManagementAdd } from './software-lincense-management-add';

describe('SoftwareLincenseManagementAdd', () => {
  let component: SoftwareLincenseManagementAdd;
  let fixture: ComponentFixture<SoftwareLincenseManagementAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftwareLincenseManagementAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(SoftwareLincenseManagementAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
