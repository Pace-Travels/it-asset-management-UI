import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerManagementCategorList } from './server-management-categor-list';

describe('ServerManagementCategorList', () => {
  let component: ServerManagementCategorList;
  let fixture: ComponentFixture<ServerManagementCategorList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerManagementCategorList],
    }).compileComponents();

    fixture = TestBed.createComponent(ServerManagementCategorList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
