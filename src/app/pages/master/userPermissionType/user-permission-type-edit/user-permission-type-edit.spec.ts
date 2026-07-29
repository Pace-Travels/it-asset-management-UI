import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPermissionTypeEdit } from './user-permission-type-edit';

describe('UserPermissionTypeEdit', () => {
  let component: UserPermissionTypeEdit;
  let fixture: ComponentFixture<UserPermissionTypeEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPermissionTypeEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(UserPermissionTypeEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
