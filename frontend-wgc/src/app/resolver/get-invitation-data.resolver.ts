import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { GuestDataStore } from '../shared/store/guest-panel.store';
import { InvitationService } from '../services/invitation-service.service';
import { firstValueFrom } from 'rxjs';

export const getInvitationDataResolver: ResolveFn<boolean> = async (route, state) => {
  const store = inject(GuestDataStore);
  const invitationService = inject(InvitationService);

  const id = route.queryParams['id'];
  if(id){
    store.loadingData();
    const response = await firstValueFrom(invitationService.fetchInvitationData(id));
    store.updateValues(response);
    store.finishLoading();
  }

  return true;
};
