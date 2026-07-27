import { Routes } from "@angular/router";
import { ServerManagementCategorAdd } from "../serverManagementCategory/server-management-categor-add/server-management-categor-add";
import { ServerManagementCategorList } from "../serverManagementCategory/server-management-categor-list/server-management-categor-list";
import { ServerManagementCategorEdit } from "../serverManagementCategory/server-management-categor-edit/server-management-categor-edit";

export const SERVERMANAGESTATUS_TOUTE : Routes = [

    {
        path: '', component:ServerManagementCategorList
    },
    {
        path: 'add', component:ServerManagementCategorAdd
    },
    {
        path:'update/:id', component:ServerManagementCategorEdit
    }

]