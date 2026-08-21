import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetManagementAdd } from './internet-management-add';

describe('InternetManagementAdd', () => {
  let component: InternetManagementAdd;
  let fixture: ComponentFixture<InternetManagementAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternetManagementAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(InternetManagementAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
