import { Routes } from "@angular/router";
import { MobileRechargeStatusList } from "./mobile-recharge-status-list/mobile-recharge-status-list";
import { MobileRechargeStatusAdd } from "./mobile-recharge-status-add/mobile-recharge-status-add";
import { MobileRechargeStatusEdit } from "./mobile-recharge-status-edit/mobile-recharge-status-edit";

export const MOBILERECHARGESTATUS_ROUTE : Routes = [

    {
        path:'', component:MobileRechargeStatusList
    },
    {
        path:'add', component:MobileRechargeStatusAdd
    },
    {
        path:'update/:id', component:MobileRechargeStatusEdit
    }

]