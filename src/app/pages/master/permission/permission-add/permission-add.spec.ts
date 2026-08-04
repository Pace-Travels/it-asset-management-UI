import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionAdd } from './permission-add';

describe('PermissionAdd', () => {
  let component: PermissionAdd;
  let fixture: ComponentFixture<PermissionAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
