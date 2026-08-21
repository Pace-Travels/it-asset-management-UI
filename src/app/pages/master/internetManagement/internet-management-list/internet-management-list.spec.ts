import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetManagementList } from './internet-management-list';

describe('InternetManagementList', () => {
  let component: InternetManagementList;
  let fixture: ComponentFixture<InternetManagementList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternetManagementList],
    }).compileComponents();

    fixture = TestBed.createComponent(InternetManagementList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
