import { Routes } from "@angular/router";
import { ServerManagementList } from "./server-management-list/server-management-list";
import { ServerManagementAdd } from "./server-management-add/server-management-add";
import { ServerManagementEdit } from "./server-management-edit/server-management-edit";

export const SERVEMANAGEMENT_ROUTES : Routes = [

    {
        path:'', component:ServerManagementList
    },
    {
        path:'add', component:ServerManagementAdd
    },
    {
        path:'edit/:id', component:ServerManagementEdit
    }

]