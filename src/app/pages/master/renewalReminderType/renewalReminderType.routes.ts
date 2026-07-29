import { Routes } from "@angular/router";
import { RenewalReminderTypeList } from "./renewal-reminder-type-list/renewal-reminder-type-list";
import { RenewalReminderTypeAdd } from "./renewal-reminder-type-add/renewal-reminder-type-add";
import { RenewalReminderTypeEdit } from "./renewal-reminder-type-edit/renewal-reminder-type-edit";

export const RENEWALREMITYPE_ROUTE : Routes = [

    {
        path:'', component:RenewalReminderTypeList
    },
    {
        path:'add', component:RenewalReminderTypeAdd
    },
    {
        path:'update/:id', component:RenewalReminderTypeEdit
    }

]