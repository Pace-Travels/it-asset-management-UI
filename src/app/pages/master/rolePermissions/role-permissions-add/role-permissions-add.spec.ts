import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePermissionsAdd } from './role-permissions-add';

describe('RolePermissionsAdd', () => {
  let component: RolePermissionsAdd;
  let fixture: ComponentFixture<RolePermissionsAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolePermissionsAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(RolePermissionsAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
