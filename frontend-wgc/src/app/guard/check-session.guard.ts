import { CanActivateFn } from '@angular/router';
import { HttpAuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthDataStore } from '../shared/store/auth.store';

export const checkSessionGuard: CanActivateFn = async (route, state) => {
  const authService = inject(HttpAuthService);
  const authStore = inject(AuthDataStore);
  const isUserLoggedIn = authStore.isUserLoggedIn;

  if(isUserLoggedIn()) return true;
  
  const result = await firstValueFrom(authService.checkSession());
  authStore.updateLoginStatus(result);
  
  if(result.isFine)
    return true;
  else
    return false;
};
