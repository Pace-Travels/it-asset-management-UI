import { Routes } from "@angular/router";
import { UserRoleStatusList } from "./user-role-status-list/user-role-status-list";
import { UserRoleStatusAdd } from "./user-role-status-add/user-role-status-add";
import { UserRoleStatusEdit } from "./user-role-status-edit/user-role-status-edit";

export const USERROLESTSTUS_ROUTE : Routes = [

    {
        path:'', component:UserRoleStatusList
    },
    {
        path:'add', component:UserRoleStatusAdd
    },
    {
        path:'update/:id', component:UserRoleStatusEdit
    }

]