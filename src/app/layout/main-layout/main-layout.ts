import { Component, OnInit, inject } from '@angular/core';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';
import { Breadcrumb } from '../breadcrumb/breadcrumb';
import { ToastModule } from 'primeng/toast';
import { StorageService } from '../../core/services/storage.service';
import { SocketService } from '../../core/services/socket.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [Header, Sidebar, RouterOutlet, Footer, Breadcrumb, ToastModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout implements OnInit {

  private storageService = inject(StorageService);
  private socketService = inject(SocketService);

  sidebarCollapsed = false;

  ngOnInit(): void {
    const user = this.storageService.getUser();
    if (user && user.id) {
      this.socketService.registerScreen(user.id);
    }
  }

  toggleSidebar() {

    this.sidebarCollapsed = !this.sidebarCollapsed;

  }

}
