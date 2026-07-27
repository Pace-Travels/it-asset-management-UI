import { Routes } from "@angular/router";
import { MonitoringBackupStatusList } from "./monitoring-backup-status-list/monitoring-backup-status-list";
import { MonitoringBackupStatusAdd } from "./monitoring-backup-status-add/monitoring-backup-status-add";
import { MonitoringBackupStatusEdit } from "./monitoring-backup-status-edit/monitoring-backup-status-edit";

export const MONITORINGBACKUPSTATUS_ROUTE : Routes = [

    {
        path:'', component:MonitoringBackupStatusList
    },
    {
        path:'add', component:MonitoringBackupStatusAdd
    },
    {
        path:'update/:id', component:MonitoringBackupStatusEdit
    }

]