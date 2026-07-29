import { Routes } from "@angular/router";
import { AdminStatusList } from "./admin-status-list/admin-status-list";
import { AdminStatusAdd } from "./admin-status-add/admin-status-add";
import { AdminStatusEdit } from "./admin-status-edit/admin-status-edit";

export const ADMINSTATUS_ROUTE : Routes = [

    {
        path:'', component:AdminStatusList
    },
    {
        path:'add', component:AdminStatusAdd
    },
    {
        path:'update/:id', component:AdminStatusEdit
    }

]