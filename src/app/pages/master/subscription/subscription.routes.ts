import { Routes } from "@angular/router";
import { SubscriptionList } from "./subscription-list/subscription-list";
import { SubscriptionAdd } from "./subscription-add/subscription-add";
import { SubscriptionEdit } from "./subscription-edit/subscription-edit";

export const SUBSCRIPTION : Routes = [

    {
        path:'', component:SubscriptionList
    },
    {
        path:'add', component:SubscriptionAdd
    },
    {
        path:'edit/:id', component:SubscriptionEdit
    }

]