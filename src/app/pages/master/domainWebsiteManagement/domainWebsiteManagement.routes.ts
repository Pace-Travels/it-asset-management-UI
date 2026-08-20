import { Routes } from "@angular/router";
import { DomainWebsiteManagementList } from "./domain-website-management-list/domain-website-management-list";
import { DomainWebsiteManagementAdd } from "./domain-website-management-add/domain-website-management-add";
import { DomainWebsiteManagementEdit } from "./domain-website-management-edit/domain-website-management-edit";

export const DOMAIN_WEB_MANG: Routes = [

    {
        path:'', component:DomainWebsiteManagementList
    },
    {
        path:'add', component:DomainWebsiteManagementAdd
    },
    {
        path:'edit/:id', component:DomainWebsiteManagementEdit
    }

]