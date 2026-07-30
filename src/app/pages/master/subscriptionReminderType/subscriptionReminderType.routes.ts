import { Routes } from "@angular/router";
import { SubscriptionReminderTypeList } from "./subscription-reminder-type-list/subscription-reminder-type-list";
import { SubscriptionReminderTypeAdd } from "./subscription-reminder-type-add/subscription-reminder-type-add";
import { SubscriptionReminderTypeEdit } from "./subscription-reminder-type-edit/subscription-reminder-type-edit";

export const SUBSREMINDERTYPE_ROUTE: Routes = [

    {
        path:'', component:SubscriptionReminderTypeList
    },
    {
        path:'add', component:SubscriptionReminderTypeAdd
    },
    {
        path:'update/:id', component:SubscriptionReminderTypeEdit
    }

]