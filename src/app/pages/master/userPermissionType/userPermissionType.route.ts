import { Routes } from "@angular/router";
import { UserPermissionTypeList } from "./user-permission-type-list/user-permission-type-list";
import { UserPermissionTypeAdd } from "./user-permission-type-add/user-permission-type-add";
import { UserPermissionTypeEdit } from "./user-permission-type-edit/user-permission-type-edit";

export const USERPERMISSIONTYPE: Routes = [

    {
        path:'', component:UserPermissionTypeList
    },
    {
        path:'add', component:UserPermissionTypeAdd
    },
    {
        path:'update/:id', component:UserPermissionTypeEdit
    }
]