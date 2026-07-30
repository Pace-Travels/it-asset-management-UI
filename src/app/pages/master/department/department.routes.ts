import { Routes } from "@angular/router";
import { DepartmentList } from "./department-list/department-list";
import { DepartmentAdd } from "./department-add/department-add";
import { DepartmentEdit } from "./department-edit/department-edit";

export const DEPARTMENT_ROUTE : Routes = [

    {
        path:'', component:DepartmentList
    },
    {
        path:'add', component:DepartmentAdd
    },
    {
        path:'update/:id', component:DepartmentEdit
    }

]