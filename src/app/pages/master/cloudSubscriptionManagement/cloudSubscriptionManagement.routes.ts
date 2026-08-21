import { Routes } from "@angular/router";
import { CloudSubscriptionManagementList } from "./cloud-subscription-management-list/cloud-subscription-management-list";
import { CloudSubscriptionManagementAdd } from "./cloud-subscription-management-add/cloud-subscription-management-add";
import { CloudSubscriptionManagementEdit } from "./cloud-subscription-management-edit/cloud-subscription-management-edit";

export const CLOUD_SUBCRI_MANG_ROUTES: Routes = [

    {
        path:'', component:CloudSubscriptionManagementList
    },
    {
        path:'add', component:CloudSubscriptionManagementAdd
    },
    {
        path:"edit/:id", component:CloudSubscriptionManagementEdit
    }

]