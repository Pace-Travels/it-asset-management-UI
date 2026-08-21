import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePermissionsList } from './role-permissions-list';

describe('RolePermissionsList', () => {
  let component: RolePermissionsList;
  let fixture: ComponentFixture<RolePermissionsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolePermissionsList],
    }).compileComponents();

    fixture = TestBed.createComponent(RolePermissionsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
