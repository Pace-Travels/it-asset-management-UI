import { Routes } from "@angular/router";
import { SSLCertificateManagementList } from "./ssl-certificate-management-list/ssl-certificate-management-list";
import { SSLCertificateManagementAdd } from "./ssl-certificate-management-add/ssl-certificate-management-add";
import { SSLCertificateManagementEdit } from "./ssl-certificate-management-edit/ssl-certificate-management-edit";

export const SSL_CERTI_MANG : Routes = [

    {
        path:"", component:SSLCertificateManagementList
    },
    {
        path:'add', component:SSLCertificateManagementAdd
    },
    {
        path:'edit/:id', component:SSLCertificateManagementEdit
    }

]