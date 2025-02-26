import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { GuestStoreData, Invitation } from "../../types/guests-store-data.types";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { distinctUntilChanged, pipe, switchMap, tap } from "rxjs";
import { inject } from "@angular/core";
import { InvitationService } from "../../services/invitation-service.service";
import { tapResponse } from '@ngrx/operators';
import { MatDialog } from "@angular/material/dialog";
import { InvalidCodeDialogComponent } from "../../guest-panel/invite-confirmation/invalid-code-dialog/invalid-code-dialog.component";

const initialState: GuestStoreData = {
    invitationId: undefined,
    isLoading: false,
    guestsData: undefined,
    confirmed: false,
    comment: null,
    needAccommodation: false,
    countOfFailedCodesProvided: 0
}

export const GuestDataStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, invitationService = inject(InvitationService), dialogServ = inject(MatDialog)) => (
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
            updateValues(invitation: Invitation): void {
              patchState(store, { invitationId: invitation.id, guestsData: invitation.guests, comment: invitation.comment, confirmed: invitation.confirmed, needAccommodation: invitation.needAccommodation});
            },
            fetchInvitationDataById: rxMethod<string>(
                pipe(
                  distinctUntilChanged(),
                  tap(() => patchState(store, { isLoading: true })),
                  switchMap((id) => {
                    return invitationService.fetchInvitationData(id).pipe(
                      tapResponse({
                        next: (invitation) => patchState(store, { guestsData : invitation.guests, invitationId: invitation.id, comment: invitation.comment,
                          confirmed: invitation.confirmed, needAccommodation: invitation.needAccommodation, isLoading: false }),
                        error: (err) => {
                          patchState(store, { countOfFailedCodesProvided: store.countOfFailedCodesProvided()+1 })
                          dialogServ.open(InvalidCodeDialogComponent, {data: store.countOfFailedCodesProvided, disableClose: true});
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