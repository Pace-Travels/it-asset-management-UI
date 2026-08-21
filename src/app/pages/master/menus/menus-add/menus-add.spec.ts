import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusAdd } from './menus-add';

describe('MenusAdd', () => {
  let component: MenusAdd;
  let fixture: ComponentFixture<MenusAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenusAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(MenusAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
