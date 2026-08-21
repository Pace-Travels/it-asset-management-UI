import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { MenusServices } from '../../../../core/services/master/menus.services';

@Component({
  selector: 'app-menu-edit',
  imports: [PageHeader, ReactiveFormsModule, ValidationMessage, CommonModule],
  templateUrl: './menus-edit.html',
  styleUrl: './menus-edit.scss',
})
export class MenusEdit implements OnInit {

  menuForm!: FormGroup;
  menuId!: number;
  submitted = false;

  parentMenus: any[] = [];

  private location = inject(Location);

  constructor(
    private fb: FormBuilder,
    private menuService: MenusServices,
    private route: ActivatedRoute,
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

    this.route.params.subscribe(params => {
      this.menuId = Number(params['id']);
      if (this.menuId) {
        this.getMenuData();
      }
    });
  }

  getMenuData(): void {
    this.menuService
      .getByIdData(this.menuId)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.menuForm.patchValue({
              parentId: response.data.parentId,
              name: response.data.name,
              route: response.data.route,
              icon: response.data.icon,
              level: response.data.level,
              sortOrder: response.data.sortOrder,
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

    if (this.menuForm.invalid) {
      this.menuForm.markAllAsTouched();
      return;
    }

    const payload = this.menuForm.value;

    this.menuService
      .update(this.menuId, payload)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.message
            });

            setTimeout(() => {
              this.router.navigate(['/menu']);
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
    const control = this.menuForm.get(controlName);
    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );
  }

}