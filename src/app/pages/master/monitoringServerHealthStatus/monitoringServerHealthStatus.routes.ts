import { Routes } from "@angular/router";
import { MonitoringServerHealthStatusAdd } from "./monitoring-server-health-status-add/monitoring-server-health-status-add";
import { MonitoringServerHealthStatusList } from "./monitoring-server-health-status-list/monitoring-server-health-status-list";
import { MonitoringBackupStatusEdit } from "../monitoringBackupStatus/monitoring-backup-status-edit/monitoring-backup-status-edit";

export const MONITORINGSERVERHELTHSTATUS_ROUTE : Routes = [

    {
        path:'', component:MonitoringServerHealthStatusList
    },
    {
        path:'add', component:MonitoringServerHealthStatusAdd
    },
    {
        path:'update/:id', component:MonitoringBackupStatusEdit
    }

]