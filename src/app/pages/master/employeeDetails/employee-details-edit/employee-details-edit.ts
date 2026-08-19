import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { EmployeeDetailsService } from '../../../../core/services/master/employee-details.service';

@Component({
  selector: 'app-employee-details-edit',
  imports: [PageHeader, ReactiveFormsModule, ValidationMessage, CommonModule],
  templateUrl: './employee-details-edit.html',
  styleUrl: './employee-details-edit.scss',
})
export class EmployeeDetailsEdit implements OnInit {

  employeeForm!: FormGroup;
  employeeRecordId!: number;
  submitted = false;
  departments: any[] = []; // Populate from API in real usage

  private location = inject(Location);

  constructor(
    private fb: FormBuilder,
    private employeeDetailsService: EmployeeDetailsService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      employeeCode: ['', Validators.required],
      employeeId: ['', Validators.required],
      employeeName: ['', Validators.required],
      departmentId: [null, Validators.required],
      designation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      isActive: [true, Validators.required]
    });

    this.route.params.subscribe(params => {
      this.employeeRecordId = Number(params['id']);
      if (this.employeeRecordId) {
        this.getEmployeeData();
      }
    });
  }

  getEmployeeData(): void {
    this.employeeDetailsService
      .getByIdData(this.employeeRecordId)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.employeeForm.patchValue({
              employeeCode: response.data.employeeCode,
              employeeId: response.data.employeeId,
              employeeName: response.data.employeeName,
              departmentId: response.data.departmentId,
              designation: response.data.designation,
              email: response.data.email,
              mobileNumber: response.data.mobileNumber,
              isActive: response.data.isActive
            });
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  update(): void {
    this.submitted = true;

    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const payload = this.employeeForm.value;

    this.employeeDetailsService
      .update(this.employeeRecordId, payload)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.message
            });

            setTimeout(() => {
              this.router.navigate(['/employee-details']);
            }, 1000);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response.message
            });
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error?.error?.message || 'Something went wrong.'
          });
        }
      });
  }

  goBack() {
    this.location.back();
  }

  isInvalid(controlName: string): boolean {
    const control = this.employeeForm.get(controlName);
    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );
  }

}