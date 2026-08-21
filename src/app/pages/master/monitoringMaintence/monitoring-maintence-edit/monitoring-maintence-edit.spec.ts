import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringMaintenceEdit } from './monitoring-maintence-edit';

describe('MonitoringMaintenceEdit', () => {
  let component: MonitoringMaintenceEdit;
  let fixture: ComponentFixture<MonitoringMaintenceEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitoringMaintenceEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(MonitoringMaintenceEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
