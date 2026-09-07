import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';
import { DashboardService } from '../../core/services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {

  @Output() toggleSidebar = new EventEmitter<void>();

  private authService = inject(AuthService);
  private dashboardService = inject(DashboardService);
  private router = inject(Router);

  notificationOpen = false;
  profileOpen = false;
  currentUser: any = null;
  notifications: any[] = [];

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.dashboardService.getNotifications().subscribe({
      next: (res: any) => {
        if(res.success && res.data) {
          this.notifications = res.data;
        }
      },
      error: (err: any) => console.error('Failed to load notifications', err)
    });
  }

  toggle() {
    this.toggleSidebar.emit();
  }

  toggleNotification() {
    this.notificationOpen = !this.notificationOpen;
    this.profileOpen = false;
  }

  toggleProfile() {
    this.profileOpen = !this.profileOpen;
    this.notificationOpen = false;
  }

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);

  }
}
