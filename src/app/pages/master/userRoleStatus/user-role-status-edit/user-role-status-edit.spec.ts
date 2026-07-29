import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleStatusEdit } from './user-role-status-edit';

describe('UserRoleStatusEdit', () => {
  let component: UserRoleStatusEdit;
  let fixture: ComponentFixture<UserRoleStatusEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRoleStatusEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(UserRoleStatusEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
