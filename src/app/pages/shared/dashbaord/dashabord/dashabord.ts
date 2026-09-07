import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { DashboardService } from '../../../../core/services/dashboard.service';

@Component({
  selector: 'app-dashabord',
  imports: [CommonModule, ChartModule],
  templateUrl: './dashabord.html',
  styleUrl: './dashabord.scss',
})
export class Dashabord implements OnInit {

  constructor(
    private router: Router
  ) { }

  private dashboardService = inject(DashboardService);

  viewAllAssets(): void {
    this.router.navigate(['/asset-info']);
  }
  
  userName = 'User';
  today = new Date();

  cards = [
    { title: 'Total Assets', value: 0, icon: 'pi pi-box', footer: 'Total', iconClass: 'primary' },
    { title: 'Assigned Assets', value: 0, icon: 'pi pi-desktop', footer: 'Assigned', iconClass: 'success' },
    { title: 'Available Assets', value: 0, icon: 'pi pi-check-circle', footer: 'Ready', iconClass: 'warning' },
    { title: 'Under Repair', value: 0, icon: 'pi pi-wrench', footer: 'Repair', iconClass: 'danger' }
  ];

  categoryData: any;
  chartOptions: any;
  recentAssets: any[] = [];
  warrantyAlerts: any[] = [];
  recentActivities: any[] = [];
  reminders: any[] = [];

  ngOnInit() {
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    };

    this.dashboardService.getDashboardStats().subscribe({
      next: (res: any) => {
        if(res.success && res.data) {
          const stats = res.data;
          
          this.cards[0].value = stats.cards.totalAssets;
          this.cards[1].value = stats.cards.assignedAssets;
          this.cards[2].value = stats.cards.availableAssets;
          this.cards[3].value = stats.cards.underRepair;

          this.categoryData = stats.categoryData;
          this.recentAssets = stats.recentAssets;
          this.warrantyAlerts = stats.warrantyAlerts;
          this.recentActivities = stats.recentActivities;
          this.reminders = stats.reminders;
        }
      },
      error: (err: any) => console.error('Failed to load dashboard stats', err)
    });
  }
}
