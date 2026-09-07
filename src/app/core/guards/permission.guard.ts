import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const permissionGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  const requiredPermission = route.data?.['permission'];
  
  if (!requiredPermission) {
    // If no permission is specified in route data, allow access
    return true;
  }

  const user = storageService.getUser();
  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  const userPermissions: string[] = user.permissions || [];
  
  // If the backend has provided permissions but the required one is missing
  if (userPermissions.length > 0 && !userPermissions.includes(requiredPermission)) {
    router.navigate(['/access-denied']);
    return false;
  }

  // Fallback: If permissions array is missing/empty, allow access to prevent locking out until backend integration is complete
  return true;
};
