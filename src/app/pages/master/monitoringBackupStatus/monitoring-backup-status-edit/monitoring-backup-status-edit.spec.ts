import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringBackupStatusEdit } from './monitoring-backup-status-edit';

describe('MonitoringBackupStatusEdit', () => {
  let component: MonitoringBackupStatusEdit;
  let fixture: ComponentFixture<MonitoringBackupStatusEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitoringBackupStatusEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(MonitoringBackupStatusEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
