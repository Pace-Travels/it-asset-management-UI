import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPermissionTypeList } from './user-permission-type-list';

describe('UserPermissionTypeList', () => {
  let component: UserPermissionTypeList;
  let fixture: ComponentFixture<UserPermissionTypeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPermissionTypeList],
    }).compileComponents();

    fixture = TestBed.createComponent(UserPermissionTypeList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
