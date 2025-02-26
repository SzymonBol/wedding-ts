import { Routes } from '@angular/router';
import { BASE_ROUTES } from './shared/routes.enum';
import { getInvitationDataResolver } from './resolver/get-invitation-data.resolver';
import { checkSessionGuard } from './guard/check-session.guard';
import { redirectBecauseUserLoggedInGuard } from './guard/redirect-because-user-logged-in.guard';
import { getSessionResolver } from './resolver/get-session.resolver';
import { handleErrorInterceptor } from './interceptor/error-handle.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiAddressInterceptor } from './interceptor/api-address.interceptor';
import { withCredentialsInterceptor } from './interceptor/credentials.interceptor';

export const routes: Routes = [
    {
        path: `${BASE_ROUTES.GUEST_PANEL}`,
        loadComponent: () => import('./guest-panel/guest-panel.component')
        .then( c => c.GuestPanelComponent),
        children : [
            {
                path: `${BASE_ROUTES.HOME}`,
                loadComponent: () => import('./guest-panel/home/home.component')
                .then( c => c.HomeComponent),
            },
            {
                path: `${BASE_ROUTES.INVITE_CONFIRMATION}`,
                loadComponent: () => import('./guest-panel/invite-confirmation/invite-confirmation.component')
                .then( c => c.InviteConfirmationComponent),
                resolve: [getInvitationDataResolver]
            },
            {
                path: `${BASE_ROUTES.ENTER_CODE}`,
                loadComponent: () => import('./guest-panel/invite-confirmation/enter-code/enter-code.component')
                .then( c => c.EnterCodeComponent)
            },
        ]
    },
    {
        path: `${BASE_ROUTES.ADMIN}/${BASE_ROUTES.LOGIN}`, 
        loadComponent: () => import('./login/login.component').then(c => c.LoginComponent),
        canActivate: [redirectBecauseUserLoggedInGuard]
    },
    {
        path: `${BASE_ROUTES.ADMIN}/${BASE_ROUTES.MANAGE_INVITATIONS}`, 
        loadComponent: () => import('./admin-panel/admin-panel.component').then(c => c.AdminPanelComponent),
        canActivate: [checkSessionGuard],
        providers: [
            provideHttpClient(
                withInterceptors([apiAddressInterceptor, withCredentialsInterceptor, handleErrorInterceptor])
              )
        ]
    },
    {path: `${BASE_ROUTES.ADMIN}`, redirectTo: `${BASE_ROUTES.ADMIN}/${BASE_ROUTES.LOGIN}`, pathMatch: 'full'},
    {path: '**', redirectTo: `${BASE_ROUTES.GUEST_PANEL}/${BASE_ROUTES.HOME}`},
];
