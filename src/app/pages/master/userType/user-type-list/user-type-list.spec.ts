import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeList } from './user-type-list';

describe('UserTypeList', () => {
  let component: UserTypeList;
  let fixture: ComponentFixture<UserTypeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTypeList],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTypeList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
