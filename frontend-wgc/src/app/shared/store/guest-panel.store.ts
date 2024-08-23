import { signalStore, withState } from "@ngrx/signals";

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
    withState(initialState)
  );