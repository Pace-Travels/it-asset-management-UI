import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerManagementStatusEdit } from './server-management-status-edit';

describe('ServerManagementStatusEdit', () => {
  let component: ServerManagementStatusEdit;
  let fixture: ComponentFixture<ServerManagementStatusEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerManagementStatusEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(ServerManagementStatusEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
