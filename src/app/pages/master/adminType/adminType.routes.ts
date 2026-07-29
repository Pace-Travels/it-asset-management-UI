import { Routes } from "@angular/router";
import { AdminTypeList } from "./admin-type-list/admin-type-list";
import { AdminTypeAdd } from "./admin-type-add/admin-type-add";
import { AdminTypeEdit } from "./admin-type-edit/admin-type-edit";

export const ADMINTYPE_ROUTE : Routes = [

    {
        path:'', component:AdminTypeList
    },
    {
        path:'add', component:AdminTypeAdd
    },
    {
        path:'update/:id', component:AdminTypeEdit
    }

]