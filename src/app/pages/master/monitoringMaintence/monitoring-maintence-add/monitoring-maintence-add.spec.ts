import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringMaintenceAdd } from './monitoring-maintence-add';

describe('MonitoringMaintenceAdd', () => {
  let component: MonitoringMaintenceAdd;
  let fixture: ComponentFixture<MonitoringMaintenceAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitoringMaintenceAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(MonitoringMaintenceAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
