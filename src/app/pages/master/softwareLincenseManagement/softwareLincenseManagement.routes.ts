import { Routes } from "@angular/router";
import { SoftwareLicenseManagementList } from "./software-lincense-management-list/software-lincense-management-list";
import { SoftwareLincenseManagementAdd } from "./software-lincense-management-add/software-lincense-management-add";
import { SoftwareLincenseManagementEdit } from "./software-lincense-management-edit/software-lincense-management-edit";

export const SOFT_LINCENSE_MANG: Routes = [

    {
        path:'', component:SoftwareLicenseManagementList
    },
    {
        path:'add', component:SoftwareLincenseManagementAdd
    },
    {
        path:'edit/:id', component:SoftwareLincenseManagementEdit
    }

]