import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { NotFound } from './pages/not-found/not-found';
import { AccessDenied } from './pages/access-denied/access-denied';


export const routes: Routes = [

  // Default route -> Login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // Login Page
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login')
        .then(c => c.LoginComponent)
  },

  // Layout Routes
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout')
        .then(c => c.MainLayout),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard', loadChildren: () => import('./pages/shared/dashbaord/dasboard.routes').then((m) => m.DASHBOARD_ROUTE),
      },
      {
        path: 'asset-info', loadChildren: () => import('./pages/master/asset-info/assetInfo.routes').then((m) => m.ASSETINFO_ROUTE),
      },
      {
        path: 'asset-info-status', loadChildren: () => import('./pages/master/assetInfoStatus/assetInfoStatus.routes').then((m) => m.ASSET_INFO_STATUS),
      },
      {
        path: "asset-info-categaory", loadChildren: () => import('./pages/master/assetInformationCategory/assetInformationCategory.routes').then((m) => m.ASSETINFOCATEGORY_ROUTE),
      },
      {
        path:'server-mngt-category', loadChildren: () => import('./pages/master/serverManagementCategory/serverManagementCategory.routes').then((m) => m.SERVERMANAGECATEGORY)
      },
      {
        path:'server-mngt-status', loadChildren: () => import('./pages/master/serverManagementStatus/serverManagementStatus.routes').then((m) => m.SERVERMANAGESTATUS_TOUTE)
      },
      {
        path:'monitoring-backup-status', loadChildren: () => import('./pages/master/monitoringBackupStatus/monitoringBackupStatus.routes').then((m) => m.MONITORINGBACKUPSTATUS_ROUTE)
      },
      {
        path:'monitoring-server-health-status', loadChildren: () => import('./pages/master/monitoringServerHealthStatus/monitoringServerHealthStatus.routes').then((m) => m.MONITORINGSERVERHELTHSTATUS_ROUTE)
      },
      {
        path:'mobile-recharge-status', loadChildren: () => import('./pages/master/mobileRechargeStatus/mobileRechargeStatus.routes').then((m) => m.MOBILERECHARGESTATUS_ROUTE)
      },
      {
        path:'software-license-category', loadChildren: () => import('./pages/master/softwareLicenseCategory/softwareLicenseCategory.routes').then((m) => m.SOFTWARELINCCATEGORY_ROUTE)
      },
      {
        path:'email-account-status', loadChildren: () => import('./pages/master/emailAccountStatus/emailAccountStatus.routes').then((m) => m.EMAILACCSTATUS_ROUTE)
      },
      {
        path:'cloud-subs-service', loadChildren: () => import('./pages/master/cloudSubscriptionService/cloudSubsService.routes').then((m) => m.CLOUDSUBSSERVICE_ROUTE)
      },
      {
        path:'renewal-reminder-type', loadChildren: () => import('./pages/master/renewalReminderType/renewalReminderType.routes').then((m) => m.RENEWALREMITYPE_ROUTE)
      },
      {
        path:'user-role-status', loadChildren: () => import('./pages/master/userRoleStatus/userRoleStatus.routes').then((m) => m.USERROLESTSTUS_ROUTE)
      },
      {
        path:'user-type', loadChildren: () => import('./pages/master/userType/userType.routes').then((m) => m.USERTYPE_ROUTE)
      },
      {
        path:'admin-type', loadChildren: () => import('./pages/master/adminType/adminType.routes').then((m) => m.ADMINTYPE_ROUTE)
      },
      {
        path:'admin-status', loadChildren: () => import('./pages/master/adminStatus/adminStatus.routes').then((m) => m.ADMINSTATUS_ROUTE)
      },
      {
        path:'user-permission-type', loadChildren: () => import('./pages/master/userPermissionType/userPermissionType.route').then((m) => m.USERPERMISSIONTYPE)
      },
      {
        path:'subscription-payment-method', loadChildren: () => import('./pages/master/subscriptionPaymentMethod/subscriptionPaymentMethod.routes').then((m) => m.SUBSPAYMENTMETHOD_ROUTE)
      },
      {
        path:'subscription-reminder-type', loadChildren: () => import('./pages/master/subscriptionReminderType/subscriptionReminderType.routes').then((m) => m.SUBSREMINDERTYPE_ROUTE)
      },
      {
        path:'department', loadChildren: () => import('./pages/master/department/department.routes').then((m) => m.DEPARTMENT_ROUTE)
      },
      {
        path:'permission', loadChildren: () => import('./pages/master/permission/permission.routes').then((m) => m.PERMISSION_ROUTE)
      },
      {
        path:'adminUser', loadChildren: () => import('./pages/auth/admin/admin.routes').then((m) => m.ADMIN_ROUTE),
      },
      {
        path:'vendor-management', loadChildren: () => import('./pages/master/vendorManagement/VendorManagement.routes').then((m) => m.VENDOR_MANG),
      },
      {
        path:'employee-details', loadChildren : () => import('./pages/master/employeeDetails/employeeDetails.routes').then((m) => m.EMPLOYEE_DETAILS_ROUTES),
      },
      {
        path:'server-managment', loadChildren: () => import('./pages/master/serverManagement/serverManagement.routes').then((m) => m.SERVEMANAGEMENT_ROUTES),
      },
      {
        path:'domain-website', loadChildren: () => import('./pages/master/domainWebsiteManagement/domainWebsiteManagement.routes').then((m) => m.DOMAIN_WEB_MANG),
      },
      {
        path:'software-license-management', loadChildren: () => import('./pages/master/softwareLincenseManagement/softwareLincenseManagement.routes').then((m) => m.SOFT_LINCENSE_MANG),
      },
      {
        path:'employee-asset-allocation', loadChildren: () => import('./pages/master/employeeAssetAllocation/employeeAssetAllocation.routes').then((m) => m.EMPLOYEE_ASSET_ALLOCATION),
      },
      {
        path:'ssl-certificate-management', loadChildren: () => import('./pages/master/SSLCertificateManagement/sslCertificateManagement.routes').then((m) => m.SSL_CERTI_MANG),
      },
      {
        path:'access-denied', component:AccessDenied
      },
      {
        path: "**", component:NotFound
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];