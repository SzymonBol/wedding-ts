import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { GuestDataStore } from '../shared/store/guest-panel.store';
import { InvitationService } from '../services/invitation-service.service';
import { firstValueFrom } from 'rxjs';
import { ROUTE } from '../shared/routes.enum';

export const getInvitationDataResolver: ResolveFn<boolean> = async (route, state) => {
  const store = inject(GuestDataStore);
  const invitationService = inject(InvitationService);
  const router = inject(Router);

  if(store.guestsData && store.guestsData() && store.invitationId && store.invitationId())
    return true;

  const id = route.queryParams['id'];
  if(id){
    store.loadingData();
    try{
      const response = await firstValueFrom(invitationService.fetchInvitationData(id));
      store.updateValues(response);
      store.finishLoading();
    } catch(err){
      router.navigateByUrl(ROUTE.ENTER_CODE);
    }   
  } else {
    router.navigateByUrl(ROUTE.ENTER_CODE);
  }

  return true;
};
