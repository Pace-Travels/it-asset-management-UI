import { Routes } from "@angular/router";
import { EmailAccountStatusList } from "./email-account-status-list/email-account-status-list";
import { EmailAccountStatusAdd } from "./email-account-status-add/email-account-status-add";
import { EmailAccountStatusEdit } from "./email-account-status-edit/email-account-status-edit";

export const EMAILACCSTATUS_ROUTE : Routes = [

    {
        path:'', component:EmailAccountStatusList
    },
    {
        path:'add', component:EmailAccountStatusAdd
    },
    {
        path:'update/:id', component:EmailAccountStatusEdit
    }

]