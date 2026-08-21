import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetManagementEdit } from './internet-management-edit';

describe('InternetManagementEdit', () => {
  let component: InternetManagementEdit;
  let fixture: ComponentFixture<InternetManagementEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternetManagementEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(InternetManagementEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
