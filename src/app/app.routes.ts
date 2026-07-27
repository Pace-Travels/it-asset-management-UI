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