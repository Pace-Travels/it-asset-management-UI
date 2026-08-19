import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerManagementEdit } from './server-management-edit';

describe('ServerManagementEdit', () => {
  let component: ServerManagementEdit;
  let fixture: ComponentFixture<ServerManagementEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerManagementEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(ServerManagementEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
