import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login';
import { MainLayout } from './layout/main-layout/main-layout';
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