import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPermissionTypeAdd } from './user-permission-type-add';

describe('UserPermissionTypeAdd', () => {
  let component: UserPermissionTypeAdd;
  let fixture: ComponentFixture<UserPermissionTypeAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPermissionTypeAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(UserPermissionTypeAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
