export interface MenuItem{
    targetRoute : string,
    label: string,
    isActive: boolean,
    external?: boolean,
    externalConfrimation? : {
        header: string,
        text: string
    }
}