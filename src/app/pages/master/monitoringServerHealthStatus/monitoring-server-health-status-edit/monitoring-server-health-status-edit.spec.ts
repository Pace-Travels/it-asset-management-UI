import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringServerHealthStatusEdit } from './monitoring-server-health-status-edit';

describe('MonitoringServerHealthStatusEdit', () => {
  let component: MonitoringServerHealthStatusEdit;
  let fixture: ComponentFixture<MonitoringServerHealthStatusEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitoringServerHealthStatusEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(MonitoringServerHealthStatusEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
