import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringBackupStatusAdd } from './monitoring-backup-status-add';

describe('MonitoringBackupStatusAdd', () => {
  let component: MonitoringBackupStatusAdd;
  let fixture: ComponentFixture<MonitoringBackupStatusAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitoringBackupStatusAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(MonitoringBackupStatusAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
