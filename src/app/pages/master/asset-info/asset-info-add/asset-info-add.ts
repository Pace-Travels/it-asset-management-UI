import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { ValidationMessage } from '../../../shared/components/validation-message/validation-message';
import { AssetInformationCategory } from '../../../../core/services/master/asset-information-category';
import { VendorManagmentService } from '../../../../core/services/master/vendor-managment.service';
import { AssetInfoStatusService } from '../../../../core/services/master/asset-info-status.service.ts';

@Component({
  selector: 'app-asset-info-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PageHeader, ValidationMessage],
  templateUrl: './asset-info-add.html',
  styleUrl: './asset-info-add.scss',
})
export class AssetInfoAdd {

  assetForm!: FormGroup;

  categories: any[] = [];
  vendors: any[] = [];
  statuses: any[] = [];

  constructor(
    private fb: FormBuilder,
    private assetCategoryService: AssetInformationCategory,
    private vendorService: VendorManagmentService,
    private assetStatusService: AssetInfoStatusService
  ) { }

  ngOnInit() {
    this.assetForm = this.fb.group({
      assetCode: ['', Validators.required],
      assetName: ['', Validators.required],
      categoryId: [null, Validators.required],
      assetType: ['', Validators.required],
      brand: ['', Validators.required],
      model: [''],
      serialNumber: [''],
      statusId: [null, Validators.required],
      vendorId: [null, Validators.required],
      purchaseDate: ['', Validators.required],
      purchaseCost: [''],
      invoiceNumber: [''],
      warrantyStart: [''],
      warrantyEnd: [''],
      employee: [''],
      department: [''],
      location: [''],
      condition: ['Good'],
      assignedDate: [''],
      assetValue: ['']
    });

    // this.loadDropdowns();
  }

  // loadDropdowns(): void {
  //   this.assetCategoryService.fetchAll().subscribe({
  //     next: (res: any) => { if (res.success) this.categories = res.data; },
  //     error: (err) => console.error(err)
  //   });

  //   this.vendorService.fetchAll().subscribe({
  //     next: (res: any) => { if (res.success) this.vendors = res.data; },
  //     error: (err) => console.error(err)
  //   });

  //   this.assetStatusService.fetchAll().subscribe({
  //     next: (res: any) => { if (res.success) this.statuses = res.data; },
  //     error: (err) => console.error(err)
  //   });
  // }

  submitted = false;

  save() {
    this.submitted = true;
    if (this.assetForm.invalid) {
      this.assetForm.markAllAsTouched();
      return;
    }
    console.log(this.assetForm.value);
  }

  private location = inject(Location);

  goBack() {
    this.location.back();
  }

  isInvalid(controlName: string): boolean {
    const control = this.assetForm.get(controlName);
    return !!(control && control.invalid && (control.touched || this.submitted));
  }
}
