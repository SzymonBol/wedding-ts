import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { GuestDataStore } from '../shared/store/guest-panel.store';
import { InvitationService } from '../services/invitation-service.service';
import { firstValueFrom } from 'rxjs';
import { ROUTE } from '../shared/routes.enum';
import { LogMessageServce } from '../services/log-message.service';

export const getInvitationDataResolver: ResolveFn<boolean> = async (route, state) => {
  const store = inject(GuestDataStore);
  const invitationService = inject(InvitationService);
  const router = inject(Router);
  const logMessageServce = inject(LogMessageServce);

  if(store.guestsData && store.guestsData() && store.invitationId && store.invitationId())
    return true;

  const id = route.queryParams['id'];
  if(id){
    store.loadingData();
    try{
      const response = await firstValueFrom(invitationService.fetchInvitationData(id));
      store.updateValues(response);
      store.finishLoading();
      logMessageServce.logMessage({text: 'Received data for ' + response.guests[0].name + ' ' + response.guests[0].surname, severity: 'info'});                
    } catch(err){
      logMessageServce.logMessage({text: 'Cannot revceived data with error ' + err, severity: 'error'});
      router.navigateByUrl(ROUTE.ENTER_CODE);
    }   
  } else {
    logMessageServce.logMessage({text: 'There is no id in url', severity: 'error'});
    router.navigateByUrl(ROUTE.ENTER_CODE);
  }

  return true;
};
