import { Routes } from '@angular/router';
import { BASE_ROUTES } from './shared/routes.enum';

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
                .then( c => c.InviteConfirmationComponent)
            },
            {
                path: `${BASE_ROUTES.ADDITIONAL_INFO}`,
                loadComponent: () => import('./guest-panel/additional-info/additional-info.component')
                .then( c => c.AdditionalInfoComponent)
            },
        ]
    },

    {path: '', redirectTo: `${BASE_ROUTES.GUEST_PANEL}/${BASE_ROUTES.HOME}`, pathMatch: 'full'},
    {path: '**', redirectTo: `${BASE_ROUTES.GUEST_PANEL}/${BASE_ROUTES.HOME}`},
];
