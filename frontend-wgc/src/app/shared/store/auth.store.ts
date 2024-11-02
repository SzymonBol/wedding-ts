import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { AuthStoreData, LoginResponse } from "../../types/auth.types";
import { state } from "@angular/animations";

const initialState: AuthStoreData = {
    isUserLoggedIn: false,
    loggedUser: null
}

export const AuthDataStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => (
        {
            updateLoginStatus(loginResponse : LoginResponse) : void {
                patchState(store, {isUserLoggedIn: loginResponse.isFine, loggedUser: loginResponse.user})
            }
        }
    ))
)