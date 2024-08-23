export enum BASE_ROUTES {
    GUEST_PANEL = 'panel-goscia',
    HOME = 'strona-glowna',
    INVITE_CONFIRMATION = 'potwierdz-zaproszenie',
    ADDITIONAL_INFO = 'informacje-dodatkowe',
    ADMIN = 'aministrator',
    LOGIN = 'logowanie',
    MANAGE_INVITATIONS = 'zarzadzaj-zaproszeniami',
}

export enum ROUTE {
    HOME = `${BASE_ROUTES.GUEST_PANEL}/${BASE_ROUTES.HOME}`,
    INVITE_CONFIRMATION = `${BASE_ROUTES.GUEST_PANEL}/${BASE_ROUTES.INVITE_CONFIRMATION}`,
    ADDITIONAL_INFO = `${BASE_ROUTES.GUEST_PANEL}/${BASE_ROUTES.ADDITIONAL_INFO}`,
    ADMIN_LOGIN = `${BASE_ROUTES.ADMIN}/${BASE_ROUTES.LOGIN}`,
    ADMIN_MANAGE_INVITATIONS = `${BASE_ROUTES.ADMIN}/${BASE_ROUTES.MANAGE_INVITATIONS}`,
}