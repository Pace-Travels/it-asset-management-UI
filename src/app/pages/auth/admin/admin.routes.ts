import { Routes } from "@angular/router";
import { AdminList } from "./admin-list/admin-list";
import { AdminAdd } from "./admin-add/admin-add";
import { AdminEdit } from "./admin-edit/admin-edit";

export const ADMIN_ROUTE: Routes = [

    {
        path:'', component:AdminList
    },
    {
        path:'add', component:AdminAdd
    },
    {
        path:'update/:id', component:AdminEdit
    }

]