import { Routes } from "@angular/router";
import { SubscriptionPaymentMethodList } from "./subscription-payment-method-list/subscription-payment-method-list";
import { SubscriptionPaymentMethodAdd } from "./subscription-payment-method-add/subscription-payment-method-add";
import { SubscriptionPaymentMethodEdit } from "./subscription-payment-method-edit/subscription-payment-method-edit";

export const SUBSPAYMENTMETHOD_ROUTE : Routes = [

    {
        path:'', component:SubscriptionPaymentMethodList
    },
    {
        path:'add', component:SubscriptionPaymentMethodAdd
    },
    {
        path:'update/:id', component:SubscriptionPaymentMethodEdit
    }

]