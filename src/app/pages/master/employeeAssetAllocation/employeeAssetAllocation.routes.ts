import { Routes } from "@angular/router";
import { EmployeeAssetAllocationList } from "./employee-asset-allocation-list/employee-asset-allocation-list";
import { EmployeeAssetAllocationAdd } from "./employee-asset-allocation-add/employee-asset-allocation-add";
import { EmployeeAssetAllocationEdit } from "./employee-asset-allocation-edit/employee-asset-allocation-edit";

export const EMPLOYEE_ASSET_ALLOCATION: Routes = [

    {
        path:'', component:EmployeeAssetAllocationList
    },
    {
        path:'add', component:EmployeeAssetAllocationAdd
    },
    {
        path:'edit/:id', component:EmployeeAssetAllocationEdit
    }

]