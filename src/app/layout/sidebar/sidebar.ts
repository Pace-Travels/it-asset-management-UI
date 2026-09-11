import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { OnInit } from '@angular/core';
import { StorageService } from '../../core/services/storage.service';
import { MenuService } from '../../core/services/master/menu.service';

interface MenuItem {
  id: number;
  parentId: number | null;
  label: string;
  icon: string;
  route?: string | null;
  level: number;
  sortOrder: number;
  permission?: any;
  expanded?: boolean;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})

export class Sidebar implements OnInit {

  constructor(private router: Router, private storageService: StorageService, private menuService: MenuService) { }

  ngOnInit(): void {

    this.menuService.getSidebar().subscribe({
      next: (res: any) => {
        if (res && res.data) {
          this.menu = res.data;
          this.setActiveRoute(this.router.url);
        }
      },
      error: (err: any) => {
        console.error('Failed to load sidebar', err);
      }
    });

    this.setActiveRoute(this.router.url);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {

        this.setActiveRoute(event.urlAfterRedirects);

      });

  }

  private setActiveRoute(route: string): void {

    // Sab parents close
    this.menu.forEach(menu => {
      menu.expanded = false;
    });

    this.activeMenu = null;

    this.menu.forEach(parent => {

      // Parent Route
      if (parent.route && route.startsWith(parent.route)) {

        this.activeMenu = parent.id;

      }

      // Child Route
      if (parent.children && parent.children.length > 0) {

        const child = parent.children.find(c =>
          c.route && route.startsWith(c.route)
        );

        if (child) {

          this.activeMenu = child.id;

          parent.expanded = true;

        }

      }

    });

  }

  isParentActive(item: MenuItem): boolean {
    if (this.activeMenu === item.id) {
      return true;
    }

    if (item.children && item.children.length > 0) {
      return item.children.some(child => child.id === this.activeMenu);
    }

    return false;
  }

  @Input()
  collapsed: boolean = false;

  menu: MenuItem[] = [];

  toggle(item: MenuItem): void {

    if (item.children && item.children.length > 0) {

      item.expanded = !item.expanded;

    }

  }

  activeMenu: number | null = 1;

  setActive(menu: number) {
    this.activeMenu = menu;
  }

  onMenuClick(item: MenuItem): void {
    this.setActive(item.id);

    if (item.children && item.children.length > 0) {

      // Pehle sab close
      this.menu.forEach(menu => {

        if (menu.children && menu !== item) {
          menu.expanded = false;
        }

      });

      // Sirf current open
      item.expanded = !item.expanded;

      this.setActive(item.id);

      return;
    }

    if (item.route) {
      this.router.navigate([item.route]);
    }
  }

  onChildMenuClick(child: MenuItem): void {
    this.setActive(child.id);

    if (child.route) {
      this.router.navigate([child.route]);
    }
  }

}
