import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringServerHealthStatusAdd } from './monitoring-server-health-status-add';

describe('MonitoringServerHealthStatusAdd', () => {
  let component: MonitoringServerHealthStatusAdd;
  let fixture: ComponentFixture<MonitoringServerHealthStatusAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitoringServerHealthStatusAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(MonitoringServerHealthStatusAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
