import { Routes } from "@angular/router";
import { PermissionList } from "./permission-list/permission-list";
import { PermissionAdd } from "./permission-add/permission-add";
import { PermissionEdit } from "./permission-edit/permission-edit";

export const PERMISSION_ROUTE : Routes = [

    {
        path:'', component:PermissionList
    },
    {
        path:'add', component:PermissionAdd
    },
    {
        path:'update/:id', component:PermissionEdit
    }

]