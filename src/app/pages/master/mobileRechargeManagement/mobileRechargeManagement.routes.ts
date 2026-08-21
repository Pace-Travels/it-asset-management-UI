import { Routes } from "@angular/router";
import { MobileRechargeManagementList } from "./mobile-recharge-management-list/mobile-recharge-management-list";
import { MobileRechargeManagementAdd } from "./mobile-recharge-management-add/mobile-recharge-management-add";
import { MobileRechargeManagementEdit } from "./mobile-recharge-management-edit/mobile-recharge-management-edit";

export const MOBILE_RECHARGE_MANG_ROUTES: Routes = [

    {
        path:'', component:MobileRechargeManagementList
    },
    {
        path:'add', component:MobileRechargeManagementAdd
    },
    {
        path:'edit/:id', component:MobileRechargeManagementEdit
    }

]