import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { permissionGuard } from './core/guards/permission.guard';
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
    canActivateChild: [permissionGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard', loadChildren: () => import('./pages/shared/dashbaord/dasboard.routes').then((m) => m.DASHBOARD_ROUTE), data: { permission: 'DASHBOARD_VIEW' }
      },
      {
        path: 'asset-info', loadChildren: () => import('./pages/master/asset-info/assetInfo.routes').then((m) => m.ASSETINFO_ROUTE), data: { permission: 'MASTER_VIEW' }
      },
      {
        path: 'asset-info-status', loadChildren: () => import('./pages/master/assetInfoStatus/assetInfoStatus.routes').then((m) => m.ASSET_INFO_STATUS), data: { permission: 'MASTER_USER' }
      },
      {
        path: "asset-info-categaory", loadChildren: () => import('./pages/master/assetInformationCategory/assetInformationCategory.routes').then((m) => m.ASSETINFOCATEGORY_ROUTE), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'server-mngt-category', loadChildren: () => import('./pages/master/serverManagementCategory/serverManagementCategory.routes').then((m) => m.SERVERMANAGECATEGORY), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'server-mngt-status', loadChildren: () => import('./pages/master/serverManagementStatus/serverManagementStatus.routes').then((m) => m.SERVERMANAGESTATUS_TOUTE), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'monitoring-backup-status', loadChildren: () => import('./pages/master/monitoringBackupStatus/monitoringBackupStatus.routes').then((m) => m.MONITORINGBACKUPSTATUS_ROUTE), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'monitoring-server-health-status', loadChildren: () => import('./pages/master/monitoringServerHealthStatus/monitoringServerHealthStatus.routes').then((m) => m.MONITORINGSERVERHELTHSTATUS_ROUTE), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'mobile-recharge-status', loadChildren: () => import('./pages/master/mobileRechargeStatus/mobileRechargeStatus.routes').then((m) => m.MOBILERECHARGESTATUS_ROUTE), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'software-license-category', loadChildren: () => import('./pages/master/softwareLicenseCategory/softwareLicenseCategory.routes').then((m) => m.SOFTWARELINCCATEGORY_ROUTE), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'email-account-status', loadChildren: () => import('./pages/master/emailAccountStatus/emailAccountStatus.routes').then((m) => m.EMAILACCSTATUS_ROUTE), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'cloud-subs-service', loadChildren: () => import('./pages/master/cloudSubscriptionService/cloudSubsService.routes').then((m) => m.CLOUDSUBSSERVICE_ROUTE), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'renewal-reminder-type', loadChildren: () => import('./pages/master/renewalReminderType/renewalReminderType.routes').then((m) => m.RENEWALREMITYPE_ROUTE), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'user-role-status', loadChildren: () => import('./pages/master/userRoleStatus/userRoleStatus.routes').then((m) => m.USERROLESTSTUS_ROUTE), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'user-type', loadChildren: () => import('./pages/master/userType/userType.routes').then((m) => m.USERTYPE_ROUTE), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'admin-type', loadChildren: () => import('./pages/master/adminType/adminType.routes').then((m) => m.ADMINTYPE_ROUTE), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'admin-status', loadChildren: () => import('./pages/master/adminStatus/adminStatus.routes').then((m) => m.ADMINSTATUS_ROUTE), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'user-permission-type', loadChildren: () => import('./pages/master/userPermissionType/userPermissionType.route').then((m) => m.USERPERMISSIONTYPE), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'subscription-payment-method', loadChildren: () => import('./pages/master/subscriptionPaymentMethod/subscriptionPaymentMethod.routes').then((m) => m.SUBSPAYMENTMETHOD_ROUTE), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'subscription-reminder-type', loadChildren: () => import('./pages/master/subscriptionReminderType/subscriptionReminderType.routes').then((m) => m.SUBSREMINDERTYPE_ROUTE), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'department', loadChildren: () => import('./pages/master/department/department.routes').then((m) => m.DEPARTMENT_ROUTE), data: { permission: 'MASTER_DEPARTMENT' }
      },
      {
        path:'permission', loadChildren: () => import('./pages/master/permission/permission.routes').then((m) => m.PERMISSION_ROUTE), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'adminUser', loadChildren: () => import('./pages/auth/admin/admin.routes').then((m) => m.ADMIN_ROUTE), data: { permission: 'REPORT_VIEW' }
      },
      {
        path:'vendor-management', loadChildren: () => import('./pages/master/vendorManagement/VendorManagement.routes').then((m) => m.VENDOR_MANG), data: { permission: 'REPORT_VIEW' }
      },
      {
        path:'employee-details', loadChildren : () => import('./pages/master/employeeDetails/employeeDetails.routes').then((m) => m.EMPLOYEE_DETAILS_ROUTES), data: { permission: 'REPORT_VIEW' }
      },
      {
        path:'server-managment', loadChildren: () => import('./pages/master/serverManagement/serverManagement.routes').then((m) => m.SERVEMANAGEMENT_ROUTES), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'domain-website', loadChildren: () => import('./pages/master/domainWebsiteManagement/domainWebsiteManagement.routes').then((m) => m.DOMAIN_WEB_MANG), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'software-license-management', loadChildren: () => import('./pages/master/softwareLincenseManagement/softwareLincenseManagement.routes').then((m) => m.SOFT_LINCENSE_MANG), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'employee-asset-allocation', loadChildren: () => import('./pages/master/employeeAssetAllocation/employeeAssetAllocation.routes').then((m) => m.EMPLOYEE_ASSET_ALLOCATION), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'ssl-certificate-management', loadChildren: () => import('./pages/master/SSLCertificateManagement/sslCertificateManagement.routes').then((m) => m.SSL_CERTI_MANG), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'email-account-management', loadChildren: () => import('./pages/master/emailAccountManagement/emailAccountManagement .routes').then((m) => m.EMAIL_ACC_MANG), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'subscription', loadChildren: () => import('./pages/master/subscription/subscription.routes').then((m) => m.SUBSCRIPTION), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'menus', loadChildren: () => import('./pages/master/menus/menus.routes').then((m) => m.MENU_ROUTES), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'monitoring-maintenance', loadChildren: () => import('./pages/master/monitoringMaintence/monitoringMaintence.routes').then((m) => m.MONITORING_MAINTANCE_ROUTES), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'cloud-subscription-management', loadChildren: () => import('./pages/master/cloudSubscriptionManagement/cloudSubscriptionManagement.routes').then((m) => m.CLOUD_SUBCRI_MANG_ROUTES), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'mobile-recharge-management', loadChildren: () => import('./pages/master/mobileRechargeManagement/mobileRechargeManagement.routes').then((m) => m.MOBILE_RECHARGE_MANG_ROUTES), data: { permission: 'MASTER_VIEW' }
      },
      {
        path:'role-permission', loadChildren: () => import('./pages/master/rolePermissions/rolePermissions.routes').then((m) => m.ROLE_PERMISSIONS_ROUTES), data: { permission: 'REPORT_VIEW' }
      },
      {
        path:'internet-management', loadChildren: () => import('./pages/master/internetManagement/internetManagement.routes').then((m) => m.INTERNET_MANAG_ROUTES), data: { permission: 'MASTER_VIEW' }
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