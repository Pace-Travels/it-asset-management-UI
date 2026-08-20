import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { EmployeeAssetAllocationService } from '../../../../core/services/master/employee-asset-allocation.service';
import { EmployeeDetailsService } from '../../../../core/services/master/employee-details.service';
import { AssetInformationService } from '../../../../core/services/master/asset-information.service';

@Component({
  selector: 'app-employee-asset-allocation-edit',
  imports: [CommonModule, ReactiveFormsModule, PageHeader],
  templateUrl: './employee-asset-allocation-edit.html',
  styleUrl: './employee-asset-allocation-edit.scss',
})
export class EmployeeAssetAllocationEdit implements OnInit {

  allocationForm!: FormGroup;
  allocationId!: number;
  loading = false;
  submitting = false;

  employeeList: any[] = [];
  assetList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private allocationService: EmployeeAssetAllocationService,
    private employeeService: EmployeeDetailsService,
    private assetService: AssetInformationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getDropdownData();

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.allocationId = +params['id'];
        this.getAllocationById(this.allocationId);
      }
    });
  }

  initForm(): void {
    this.allocationForm = this.fb.group({
      allocationCode: ['', [Validators.required, Validators.maxLength(30)]],
      employeeId: [null, [Validators.required]],
      assetId: [null, [Validators.required]],
      allocatedDate: ['', [Validators.required]],
      returnDate: [null],
      allocationStatus: ['Allocated', [Validators.required]],
      remarks: ['', [Validators.maxLength(500)]],
      isActive: [true]
    });
  }

  getDropdownData(): void {
    this.employeeService.getDropdownList().subscribe({
      next: (res) => { if (res.success) this.employeeList = res.data; }
    });

    this.assetService.getDropdownList().subscribe({
      next: (res) => { if (res.success) this.assetList = res.data; }
    });
  }

  getAllocationById(id: number): void {
    this.loading = true;
    this.allocationService.getById(id).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.allocationForm.patchValue(response.data);
        }
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.allocationForm.invalid) {
      this.allocationForm.markAllAsTouched();
      return;
    }

    this.submitting = true;

    this.allocationService.update(this.allocationId, this.allocationForm.value).subscribe({
      next: (response) => {
        this.submitting = false;
        if (response.success) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
          this.goBack();
        }
      },
      error: (err) => {
        this.submitting = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.message || 'Update failed' });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/employee-asset-allocation']);
  }

}