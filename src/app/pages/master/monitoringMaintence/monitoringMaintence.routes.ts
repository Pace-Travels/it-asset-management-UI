import { Routes } from "@angular/router";
import { MonitoringMaintenceList } from "./monitoring-maintence-list/monitoring-maintence-list";
import { MonitoringMaintenceAdd } from "./monitoring-maintence-add/monitoring-maintence-add";
import { MonitoringMaintenceEdit } from "./monitoring-maintence-edit/monitoring-maintence-edit";

export const MONITORING_MAINTANCE_ROUTES : Routes = [

    {
        path:'', component:MonitoringMaintenceList
    },
    {
        path:'add', component:MonitoringMaintenceAdd
    },
    {
        path:'edit/:id', component:MonitoringMaintenceEdit
    }

]