import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatusEdit } from './admin-status-edit';

describe('AdminStatusEdit', () => {
  let component: AdminStatusEdit;
  let fixture: ComponentFixture<AdminStatusEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStatusEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminStatusEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
