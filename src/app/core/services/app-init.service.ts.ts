import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { AuthService } from './auth-service';
import { StorageService } from './storage.service.ts';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  private readonly authService = inject(AuthService);

  private readonly storageService = inject(StorageService);

  async initialize(): Promise<void> {

    const token = this.storageService.getAccessToken();

    if (!token) {

      return;

    }

    try {

      await firstValueFrom(

        this.authService.getProfile()

      );

    }

    catch {

      this.authService.logout();

    }

  }

}