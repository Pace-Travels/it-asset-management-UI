import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatusList } from './admin-status-list';

describe('AdminStatusList', () => {
  let component: AdminStatusList;
  let fixture: ComponentFixture<AdminStatusList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStatusList],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminStatusList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
