import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerManagementStatusList } from './server-management-status-list';

describe('ServerManagementStatusList', () => {
  let component: ServerManagementStatusList;
  let fixture: ComponentFixture<ServerManagementStatusList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerManagementStatusList],
    }).compileComponents();

    fixture = TestBed.createComponent(ServerManagementStatusList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
