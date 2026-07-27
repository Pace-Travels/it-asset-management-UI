import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringBackupStatusList } from './monitoring-backup-status-list';

describe('MonitoringBackupStatusList', () => {
  let component: MonitoringBackupStatusList;
  let fixture: ComponentFixture<MonitoringBackupStatusList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitoringBackupStatusList],
    }).compileComponents();

    fixture = TestBed.createComponent(MonitoringBackupStatusList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
