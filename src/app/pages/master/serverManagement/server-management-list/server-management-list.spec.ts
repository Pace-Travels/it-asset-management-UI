import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerManagementList } from './server-management-list';

describe('ServerManagementList', () => {
  let component: ServerManagementList;
  let fixture: ComponentFixture<ServerManagementList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerManagementList],
    }).compileComponents();

    fixture = TestBed.createComponent(ServerManagementList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
