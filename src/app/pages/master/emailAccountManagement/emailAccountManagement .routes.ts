import { Routes } from "@angular/router";
import { EmailAccountManagementList } from "./email-account-management-list/email-account-management-list";
import { EmailAccountManagementAdd } from "./email-account-management-add/email-account-management-add";
import { EmailAccountManagementEdit } from "./email-account-management-edit/email-account-management-edit";

export const EMAIL_ACC_MANG: Routes = [

    {
        path:'', component:EmailAccountManagementList
    },
    {
        path:'add', component:EmailAccountManagementAdd
    },
    {
        path:'edit/:id', component:EmailAccountManagementEdit
    }

]