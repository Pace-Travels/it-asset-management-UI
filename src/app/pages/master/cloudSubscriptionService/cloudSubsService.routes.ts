import { Routes } from "@angular/router";
import { CloudSubscriptionServiceList } from "./cloud-subscription-service-list/cloud-subscription-service-list";
import { CloudSubscriptionServiceAdd } from "./cloud-subscription-service-add/cloud-subscription-service-add";
import { CloudSubscriptionServiceEdit } from "./cloud-subscription-service-edit/cloud-subscription-service-edit";

export const CLOUDSUBSSERVICE_ROUTE : Routes = [

    {
        path:'', component:CloudSubscriptionServiceList
    },
    {
        path:'add', component:CloudSubscriptionServiceAdd
    },
    {
        path:'update/:id', component:CloudSubscriptionServiceEdit
    }

]