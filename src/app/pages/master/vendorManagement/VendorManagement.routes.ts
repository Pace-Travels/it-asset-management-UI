import { Routes } from "@angular/router";
import { VendorManagementList } from "./vendor-management-list/vendor-management-list";
import { VendorManagementAdd } from "./vendor-management-add/vendor-management-add";
import { VendorManagementEdit } from "./vendor-management-edit/vendor-management-edit";

export const VENDOR_MANG : Routes = [

    {
        path:'', component:VendorManagementList
    },
    {
        path:'add', component:VendorManagementAdd
    },
    {
        path:'edit/:id', component:VendorManagementEdit
    }

]