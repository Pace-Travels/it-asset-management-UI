import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeAdd } from './user-type-add';

describe('UserTypeAdd', () => {
  let component: UserTypeAdd;
  let fixture: ComponentFixture<UserTypeAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTypeAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTypeAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
