import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service.js';

export const authGuard: CanActivateFn = () => {

  const storageService = inject(StorageService);

  const router = inject(Router);

  const token = storageService.getAccessToken();

  if (token) {

    return true;

  }

  router.navigate(['/login']);

  return false;

};