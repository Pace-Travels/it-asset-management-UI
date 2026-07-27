import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerManagementCategorAdd } from './server-management-categor-add';

describe('ServerManagementCategorAdd', () => {
  let component: ServerManagementCategorAdd;
  let fixture: ComponentFixture<ServerManagementCategorAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerManagementCategorAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(ServerManagementCategorAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
