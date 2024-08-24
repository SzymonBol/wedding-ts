import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";

type GuestData = {
    invitationId?: string;
    isLoading: boolean
}

const initialState: GuestData = {
    invitationId: undefined,
    isLoading: false
}

export const GuestDataStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => (
        {
            loadingData(): void {
                patchState(store, { isLoading: true });
            },
            finishLoading(): void {
                    patchState(store, { isLoading: false });
            }
        }
    ))
  );