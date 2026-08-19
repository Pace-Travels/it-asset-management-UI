import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface Breadcrumb {
  label: string;
  route: string;
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private breadcrumbsSubject = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  /**
   * Routes where breadcrumb should not display
   */
  private hiddenRoutes: string[] = [

    '/',

    '/dashboard',

    '/login',

    '/404',

    '/access-denied'

  ];

  constructor(private router: Router) {

    // Initial Page Load
    this.buildBreadcrumb(this.router.url);

    // Route Change
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {

        this.buildBreadcrumb(event.urlAfterRedirects);

      });

  }

  private buildBreadcrumb(url: string): void {

    const menuData = this.findMenuByRoute(url);

    if (!menuData) {

      this.breadcrumbsSubject.next([]);

      return;

    }

    url = url.split('?')[0];

    if (this.hiddenRoutes.includes(url)) {

      this.breadcrumbsSubject.next([]);

      return;

    }

    const breadcrumbs: Breadcrumb[] = [];

    // Dashboard
    const dashboard = this.menu.find(x => x.route === '/dashboard');

    if (dashboard) {

      breadcrumbs.push({

        label: dashboard.label,

        route: dashboard.route!

      });

    }

    // Parent + Child
    this.menu.forEach(parent => {

      if (!parent.children) {
        return;
      }

      const child = parent.children.find(c => c.route === url);

      if (child) {

        breadcrumbs.push({

          label: parent.label,

          route: ''

        });

        breadcrumbs.push({

          label: child.label,

          route: child.route!

        });

      }

    });

    // Top Menu
    const singleMenu = this.menu.find(x => x.route === url);

    if (
      singleMenu &&
      singleMenu.route !== '/dashboard'
    ) {

      breadcrumbs.push({

        label: singleMenu.label,

        route: singleMenu.route!

      });

    }

    this.breadcrumbsSubject.next(breadcrumbs);

  }

  private readonly menu = [

    {
      label: 'Dashboard',
      route: '/dashboard'
    },

    {
      label: 'Masters',
      children: [

        {
          label: 'Asset-Info Status',
          route: '/asset-info-status'
        },

        {
          label: 'Add New Asset Info Status',
          route: '/asset-info-status/add'
        },

        {
          label: 'Edit Asset Info Status',
          route: '/asset-info-status/update/:id'
        },

        {
          label: 'Asset Type',
          route: '/masters/asset-type'
        },

        {
          label: 'Vendor',
          route: '/masters/vendor'
        }

      ]

    },

    {
      label: 'Admin User',
      route: '/adminUser'
    },
    {
      label: 'Admin User Add',
      route: '/adminUser/add'
    },
    {
      label: 'Admin User Add',
      route: '/adminUser/update/:id'
    },
    {
      label: 'Settings',
      route: '/settings'
    }

  ];

  private findMenuByRoute(route: string): any {

    // Parent Menu
    for (const parent of this.menu) {

      if (parent.route === route) {
        return {
          parent: null,
          child: parent
        };
      }

      // Child Menu
      if (parent.children) {

        const child = parent.children.find(c => c.route === route);

        if (child) {

          return {
            parent,
            child
          };

        }

      }

    }

    return null;

  }
}