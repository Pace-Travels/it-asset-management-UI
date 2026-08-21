import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePermissionsEdit } from './role-permissions-edit';

describe('RolePermissionsEdit', () => {
  let component: RolePermissionsEdit;
  let fixture: ComponentFixture<RolePermissionsEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolePermissionsEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(RolePermissionsEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
