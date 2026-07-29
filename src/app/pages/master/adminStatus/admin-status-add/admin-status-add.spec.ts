import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatusAdd } from './admin-status-add';

describe('AdminStatusAdd', () => {
  let component: AdminStatusAdd;
  let fixture: ComponentFixture<AdminStatusAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStatusAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminStatusAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
