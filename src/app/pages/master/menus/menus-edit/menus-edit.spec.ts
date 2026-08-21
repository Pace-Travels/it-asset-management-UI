import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusEdit } from './menus-edit';

describe('MenusEdit', () => {
  let component: MenusEdit;
  let fixture: ComponentFixture<MenusEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenusEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(MenusEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
