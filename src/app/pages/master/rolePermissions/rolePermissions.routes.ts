import { Routes } from "@angular/router";
import { RolePermissionsList } from "./role-permissions-list/role-permissions-list";
import { RolePermissionsAdd } from "./role-permissions-add/role-permissions-add";
import { RolePermissionsEdit } from "./role-permissions-edit/role-permissions-edit";

export const ROLE_PERMISSIONS_ROUTES: Routes = [

    {
        path:'', component:RolePermissionsList
    },
    {
        path:'add', component:RolePermissionsAdd
    },
    {
        path:'edit/:id', component:RolePermissionsEdit
    }

]