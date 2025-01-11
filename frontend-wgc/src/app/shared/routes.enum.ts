export enum BASE_ROUTES {
    GUEST_PANEL = 'panel-goscia',
    HOME = 'strona-glowna',
    INVITE_CONFIRMATION = 'potwierdz-zaproszenie',
    ADMIN = 'admin',
    LOGIN = 'logowanie',
    MANAGE_INVITATIONS = 'zarzadzaj-zaproszeniami',
}

export enum ROUTE {
    HOME = `/${BASE_ROUTES.GUEST_PANEL}/${BASE_ROUTES.HOME}`,
    INVITE_CONFIRMATION = `/${BASE_ROUTES.GUEST_PANEL}/${BASE_ROUTES.INVITE_CONFIRMATION}`,
    ADMIN_LOGIN = `/${BASE_ROUTES.ADMIN}/${BASE_ROUTES.LOGIN}`,
    ADMIN_MANAGE_INVITATIONS = `/${BASE_ROUTES.ADMIN}/${BASE_ROUTES.MANAGE_INVITATIONS}`,
}