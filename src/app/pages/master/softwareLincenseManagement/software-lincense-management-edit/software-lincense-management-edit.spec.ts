import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareLincenseManagementEdit } from './software-lincense-management-edit';

describe('SoftwareLincenseManagementEdit', () => {
  let component: SoftwareLincenseManagementEdit;
  let fixture: ComponentFixture<SoftwareLincenseManagementEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftwareLincenseManagementEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(SoftwareLincenseManagementEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
