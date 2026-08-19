import { Routes } from "@angular/router";
import { EmployeeDetailsList } from "./employee-details-list/employee-details-list";
import { EmployeeDetailsAdd } from "./employee-details-add/employee-details-add";
import { EmployeeDetailsEdit } from "./employee-details-edit/employee-details-edit";

export const EMPLOYEE_DETAILS_ROUTES :  Routes = [

    {
        path:'', component:EmployeeDetailsList
    },
    {
        path:'add', component:EmployeeDetailsAdd
    },
    {
        path:'edit/:id', component:EmployeeDetailsEdit
    }

]