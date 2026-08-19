import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerManagementAdd } from './server-management-add';

describe('ServerManagementAdd', () => {
  let component: ServerManagementAdd;
  let fixture: ComponentFixture<ServerManagementAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerManagementAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(ServerManagementAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
