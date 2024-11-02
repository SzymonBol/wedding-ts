import { CanActivateFn, Router } from '@angular/router';
import { HttpAuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthDataStore } from '../shared/store/auth.store';
import { ROUTE } from '../shared/routes.enum';

export const redirectBecauseUserLoggedInGuard: CanActivateFn = async(route, state) => {
  const authService = inject(HttpAuthService);
  const authStore = inject(AuthDataStore);
  const router = inject(Router);
  const isUserLoggedIn = authStore.isUserLoggedIn;

  if(isUserLoggedIn()) {
    router.navigate([ROUTE.ADMIN_MANAGE_INVITATIONS]);
    return true;
  }

  try{
    const result = await firstValueFrom(authService.checkSession());
    authStore.updateLoginStatus(result);
    if(result.isFine){
      router.navigate([ROUTE.ADMIN_MANAGE_INVITATIONS]);
      return true;
    } else
      return false;
  } catch(error) {
      return true;
  }
};
