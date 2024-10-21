import { Routes } from '@angular/router';
import { BASE_ROUTES } from './shared/routes.enum';
import { getInvitationDataResolver } from './resolver/get-invitation-data.resolver';

export const routes: Routes = [
    {
        path: `${BASE_ROUTES.GUEST_PANEL}`,
        loadComponent: () => import('./guest-panel/guest-panel.component')
        .then( c => c.GuestPanelComponent),
        children : [
            {
                path: `${BASE_ROUTES.HOME}`,
                loadComponent: () => import('./guest-panel/home/home.component')
                .then( c => c.HomeComponent)
            },
            {
                path: `${BASE_ROUTES.INVITE_CONFIRMATION}`,
                loadComponent: () => import('./guest-panel/invite-confirmation/invite-confirmation.component')
                .then( c => c.InviteConfirmationComponent),
                resolve: [getInvitationDataResolver]
            },
            {
                path: `${BASE_ROUTES.ADDITIONAL_INFO}`,
                loadComponent: () => import('./guest-panel/additional-info/additional-info.component')
                .then( c => c.AdditionalInfoComponent)
            },
        ]
    },
    {
        path: `${BASE_ROUTES.ADMIN}/${BASE_ROUTES.LOGIN}`, 
        loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
    },
    {
        path: `${BASE_ROUTES.ADMIN}/${BASE_ROUTES.MANAGE_INVITATIONS}`, 
        loadComponent: () => import('./admin-panel/admin-panel.component').then(c => c.AdminPanelComponent)
    },
    {path: `${BASE_ROUTES.ADMIN}`, redirectTo: `${BASE_ROUTES.ADMIN}/${BASE_ROUTES.LOGIN}`, pathMatch: 'full'},
    {path: '', redirectTo: `${BASE_ROUTES.GUEST_PANEL}/${BASE_ROUTES.HOME}`, pathMatch: 'full'},
    {path: '**', redirectTo: `${BASE_ROUTES.GUEST_PANEL}/${BASE_ROUTES.HOME}`},
];
