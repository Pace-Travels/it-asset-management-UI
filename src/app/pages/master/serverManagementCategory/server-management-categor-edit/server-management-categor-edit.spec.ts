import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerManagementCategorEdit } from './server-management-categor-edit';

describe('ServerManagementCategorEdit', () => {
  let component: ServerManagementCategorEdit;
  let fixture: ComponentFixture<ServerManagementCategorEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerManagementCategorEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(ServerManagementCategorEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
