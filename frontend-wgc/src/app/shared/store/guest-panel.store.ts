import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { GuestStoreData } from "../../types/guests-store-data.types";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { distinctUntilChanged, pipe, switchMap, tap } from "rxjs";
import { inject } from "@angular/core";
import { InvitationService } from "../../services/invitation-service.service";
import { tapResponse } from '@ngrx/operators';

const initialState: GuestStoreData = {
    invitationId: undefined,
    isLoading: false,
    guestsData: undefined,
    confirmed: false,
    comment: null
}

export const GuestDataStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, invitationService = inject(InvitationService)) => (
        {
            loadingData(): void {
                patchState(store, { isLoading: true });
            },
            finishLoading(): void {
                    patchState(store, { isLoading: false });
            },
            updateConfirmation(confirmation: boolean): void {
              patchState(store, { confirmed: confirmation});
            },
            fetchInvitationDataById: rxMethod<string>(
                pipe(
                  distinctUntilChanged(),
                  tap(() => patchState(store, { isLoading: true })),
                  switchMap((id) => {
                    return invitationService.fetchInvitationData(id).pipe(
                      tapResponse({
                        next: (invitation) => patchState(store, { guestsData : invitation.guests, invitationId: invitation.id, comment: invitation.comment,
                          confirmed: invitation.confirmed, isLoading: false }),
                        error: (err) => {
                          patchState(store, { isLoading: false });
                          console.error(err);
                        },
                      })
                    );
                  })
                )
              ),
        }
    ))
  );