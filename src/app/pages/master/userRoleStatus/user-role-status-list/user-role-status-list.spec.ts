import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleStatusList } from './user-role-status-list';

describe('UserRoleStatusList', () => {
  let component: UserRoleStatusList;
  let fixture: ComponentFixture<UserRoleStatusList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRoleStatusList],
    }).compileComponents();

    fixture = TestBed.createComponent(UserRoleStatusList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
