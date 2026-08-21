import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { EmployeeAssetAllocationService } from '../../../../core/services/master/employee-asset-allocation.service';

@Component({
  selector: 'app-employee-asset-allocation-add',
  imports: [CommonModule, ReactiveFormsModule, PageHeader],
  templateUrl: './employee-asset-allocation-add.html',
  styleUrl: './employee-asset-allocation-add.scss',
})
export class EmployeeAssetAllocationAdd implements OnInit {

  allocationForm!: FormGroup;
  submitting = false;

  employeeList: any[] = [];
  assetList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private allocationService: EmployeeAssetAllocationService,
    // private employeeService: EmployeeDetailsService,
    // private assetService: AssetInformationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getDropdownData();
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
    // this.employeeService.getDropdownList().subscribe({
    //   next: (res) => { if (res.success) this.employeeList = res.data; }
    // });

    // this.assetService.getDropdownList().subscribe({
    //   next: (res) => { if (res.success) this.assetList = res.data; }
    // });
  }

  onSubmit(): void {
    if (this.allocationForm.invalid) {
      this.allocationForm.markAllAsTouched();
      return;
    }

    this.submitting = true;

    this.allocationService.add(this.allocationForm.value).subscribe({
      next: (response) => {
        this.submitting = false;
        if (response.success) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
          this.goBack();
        }
      },
      error: (err) => {
        this.submitting = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.message || 'Creation failed' });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/employee-asset-allocation']);
  }

}