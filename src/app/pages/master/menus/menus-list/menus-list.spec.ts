import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusList } from './menus-list';

describe('MenusList', () => {
  let component: MenusList;
  let fixture: ComponentFixture<MenusList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenusList],
    }).compileComponents();

    fixture = TestBed.createComponent(MenusList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
