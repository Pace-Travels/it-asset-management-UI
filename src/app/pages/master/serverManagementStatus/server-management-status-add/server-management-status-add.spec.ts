import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerManagementStatusAdd } from './server-management-status-add';

describe('ServerManagementStatusAdd', () => {
  let component: ServerManagementStatusAdd;
  let fixture: ComponentFixture<ServerManagementStatusAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerManagementStatusAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(ServerManagementStatusAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
