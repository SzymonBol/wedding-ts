import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { HttpAuthService } from "../services/auth.service";
import { AuthDataStore } from "../shared/store/auth.store";
import { firstValueFrom } from "rxjs";

export const getSessionResolver: ResolveFn<boolean> = async (route, state) => {
    const authService = inject(HttpAuthService);
    const authStore = inject(AuthDataStore);
    try{
        const result = await firstValueFrom(authService.checkSession());
        authStore.updateLoginStatus(result);
    } catch(error){
        console.warn('There is no existing session');
    }

    return true;
}