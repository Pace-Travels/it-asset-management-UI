import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringMaintenceList } from './monitoring-maintence-list';

describe('MonitoringMaintenceList', () => {
  let component: MonitoringMaintenceList;
  let fixture: ComponentFixture<MonitoringMaintenceList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitoringMaintenceList],
    }).compileComponents();

    fixture = TestBed.createComponent(MonitoringMaintenceList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
