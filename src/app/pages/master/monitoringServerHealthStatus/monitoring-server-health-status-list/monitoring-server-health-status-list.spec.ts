import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringServerHealthStatusList } from './monitoring-server-health-status-list';

describe('MonitoringServerHealthStatusList', () => {
  let component: MonitoringServerHealthStatusList;
  let fixture: ComponentFixture<MonitoringServerHealthStatusList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitoringServerHealthStatusList],
    }).compileComponents();

    fixture = TestBed.createComponent(MonitoringServerHealthStatusList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
