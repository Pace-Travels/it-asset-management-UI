import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionEdit } from './permission-edit';

describe('PermissionEdit', () => {
  let component: PermissionEdit;
  let fixture: ComponentFixture<PermissionEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
