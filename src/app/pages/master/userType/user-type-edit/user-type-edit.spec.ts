import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeEdit } from './user-type-edit';

describe('UserTypeEdit', () => {
  let component: UserTypeEdit;
  let fixture: ComponentFixture<UserTypeEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTypeEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTypeEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
