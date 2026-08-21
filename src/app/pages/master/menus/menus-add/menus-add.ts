import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { MenusServices } from '../../../../core/services/master/menus.services';

@Component({
  selector: 'app-menu-add',
  imports: [PageHeader, ReactiveFormsModule, ValidationMessage, CommonModule],
  templateUrl: './menus-add.html',
  styleUrl: './menus-add.scss',
})
export class MenusAdd implements OnInit {

  menuForm!: FormGroup;
  submitted = false;

  parentMenus: any[] = [];

  private location = inject(Location);

  constructor(
    private fb: FormBuilder,
    private menuService: MenusServices,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.menuForm = this.fb.group({
      parentId: [null],
      name: ['', Validators.required],
      route: [''],
      icon: [''],
      level: [1, [Validators.required, Validators.min(1)]],
      sortOrder: [0, [Validators.required, Validators.min(0)]],
      isActive: [true, Validators.required]
    });
  }

  save(): void {
    this.submitted = true;

    if (this.menuForm.invalid) {
      this.menuForm.markAllAsTouched();
      return;
    }

    const payload = this.menuForm.value;

    this.menuService.add(payload).subscribe({
      next: (response) => {
        if (response.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message
          });
          this.router.navigate(['/menu']);
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
    const control = this.menuForm.get(controlName);
    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );
  }

}