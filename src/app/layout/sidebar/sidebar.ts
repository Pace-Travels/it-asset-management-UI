import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  signal
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterModule
} from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

import { StorageService } from '../../core/services/storage.service';
import { MenuService } from '../../core/services/master/menu.service';

interface MenuItem {
  id: number;
  label: string;
  icon: string;
  route?: string;
  permission?: any;
  expanded?: boolean;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar implements OnInit, OnDestroy {

  @Input() collapsed = false;

  // ==========================================
  // Signals
  // ==========================================

  menu = signal<MenuItem[]>([]);

  activeMenu = signal<number | null>(null);

  loading = signal(false);

  // ==========================================
  // Destroy Subject
  // ==========================================

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private storageService: StorageService,
    private menuService: MenuService
  ) { }

  // ==========================================
  // Init
  // ==========================================

  ngOnInit(): void {

    this.loadSidebar();

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd =>
            event instanceof NavigationEnd
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(event => {

        this.setActiveRoute(
          event.urlAfterRedirects
        );

      });

  }

  // ==========================================
  // Load Sidebar
  // ==========================================

  private loadSidebar(): void {

    this.loading.set(true);

    this.menuService.getSidebar()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({

        next: (res: any) => {

          console.log(
            'Sidebar API Response:',
            res
          );

          if (res?.success && Array.isArray(res.data)) {

            this.menu.set(res.data);

            this.setActiveRoute(
              this.router.url
            );

          } else {

            this.menu.set([]);

          }

          this.loading.set(false);

        },

        error: (err: any) => {

          console.error(
            'Failed to load sidebar:',
            err
          );

          this.menu.set([]);

          this.loading.set(false);

        }

      });

  }

  // ==========================================
  // Active Route
  // ==========================================

  private setActiveRoute(route: string): void {

    const currentMenu = this.menu();

    if (!currentMenu.length) {
      return;
    }

    let activeId: number | null = null;

    const updatedMenu = currentMenu.map(parent => {

      let expanded = false;

      // --------------------------------------
      // Parent route
      // --------------------------------------

      if (
        parent.route &&
        parent.route !== '/' &&
        route.startsWith(parent.route)
      ) {

        activeId = parent.id;

      }

      // --------------------------------------
      // Child route
      // --------------------------------------

      const updatedChildren = parent.children?.map(child => {

        if (
          child.route &&
          child.route !== '/' &&
          route.startsWith(child.route)
        ) {

          activeId = child.id;
          expanded = true;

        }

        return child;

      });

      return {
        ...parent,
        expanded,
        children: updatedChildren
      };

    });

    this.menu.set(updatedMenu);

    if (activeId !== null) {

      this.activeMenu.set(activeId);

    }

  }

  // ==========================================
  // Check Parent Active
  // ==========================================

  isParentActive(item: MenuItem): boolean {

    const activeId = this.activeMenu();

    if (activeId === item.id) {
      return true;
    }

    if (item.children) {

      return item.children.some(
        child => child.id === activeId
      );

    }

    return false;

  }

  // ==========================================
  // Parent Menu Click
  // ==========================================

  onMenuClick(item: MenuItem): void {

    this.activeMenu.set(item.id);

    // --------------------------------------
    // Parent with children
    // --------------------------------------

    if (item.children?.length) {

      const updatedMenu = this.menu().map(menuItem => {

        if (menuItem.id === item.id) {

          return {
            ...menuItem,
            expanded: !menuItem.expanded
          };

        }

        if (menuItem.children?.length) {

          return {
            ...menuItem,
            expanded: false
          };

        }

        return menuItem;

      });

      this.menu.set(updatedMenu);

      return;
    }

    // --------------------------------------
    // Normal route
    // --------------------------------------

    if (item.route) {

      this.router.navigateByUrl(
        item.route
      );

    }

  }

  // ==========================================
  // Child Menu Click
  // ==========================================

  onChildMenuClick(child: MenuItem): void {

    this.activeMenu.set(child.id);

    if (child.route) {

      this.router.navigateByUrl(
        child.route
      );

    }

  }

  // ==========================================
  // Manual Active Menu
  // ==========================================

  setActive(menuId: number): void {

    this.activeMenu.set(menuId);

  }

  // ==========================================
  // Toggle
  // ==========================================

  toggle(item: MenuItem): void {

    if (!item.children?.length) {
      return;
    }

    const updatedMenu = this.menu().map(menuItem => {

      if (menuItem.id === item.id) {

        return {
          ...menuItem,
          expanded: !menuItem.expanded
        };

      }

      return menuItem;

    });

    this.menu.set(updatedMenu);

  }

  // ==========================================
  // Destroy
  // ==========================================

  ngOnDestroy(): void {

    this.destroy$.next();
    this.destroy$.complete();

  }

}