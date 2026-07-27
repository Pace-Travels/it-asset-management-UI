import { Routes } from "@angular/router";
import { ServerManagementCategorAdd } from "./server-management-categor-add/server-management-categor-add";
import { ServerManagementCategorEdit } from "./server-management-categor-edit/server-management-categor-edit";
import { ServerManagementCategorList } from "./server-management-categor-list/server-management-categor-list";

export const SERVERMANAGECATEGORY : Routes = [

    {
        path:'', component:ServerManagementCategorList
    },
    {
        path:'add', component:ServerManagementCategorAdd
    },
    {
        path:"update/:id", component:ServerManagementCategorEdit
    }

]