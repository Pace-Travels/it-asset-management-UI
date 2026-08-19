import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { EmployeeDetailsService } from '../../../../core/services/master/employee-details.service';

@Component({
  selector: 'app-employee-details-add',
  imports: [PageHeader, ReactiveFormsModule, ValidationMessage, CommonModule],
  templateUrl: './employee-details-add.html',
  styleUrl: './employee-details-add.scss',
})
export class EmployeeDetailsAdd implements OnInit {

  employeeForm!: FormGroup;
  submitted = false;
  departments: any[] = []; // Populate from API in real usage

  private location = inject(Location);

  constructor(
    private fb: FormBuilder,
    private employeeDetailsService: EmployeeDetailsService,
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
  }

  save(): void {
    this.submitted = true;

    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const payload = this.employeeForm.value;

    this.employeeDetailsService.add(payload).subscribe({
      next: (response) => {
        if (response.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message
          });
          this.router.navigate(['/employee-details']);
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