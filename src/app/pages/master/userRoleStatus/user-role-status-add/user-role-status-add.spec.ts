import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleStatusAdd } from './user-role-status-add';

describe('UserRoleStatusAdd', () => {
  let component: UserRoleStatusAdd;
  let fixture: ComponentFixture<UserRoleStatusAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRoleStatusAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(UserRoleStatusAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
