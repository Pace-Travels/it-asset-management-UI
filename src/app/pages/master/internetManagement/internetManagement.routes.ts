import { Routes } from "@angular/router";
import { InternetManagementList } from "./internet-management-list/internet-management-list";
import { InternetManagementAdd } from "./internet-management-add/internet-management-add";
import { InternetManagementEdit } from "./internet-management-edit/internet-management-edit";

export const INTERNET_MANAG_ROUTES: Routes = [

    {
        path:'', component:InternetManagementList
    },
    {
        path:'add', component:InternetManagementAdd
    },
    {
        path:'edit/:id', component:InternetManagementEdit
    }

]