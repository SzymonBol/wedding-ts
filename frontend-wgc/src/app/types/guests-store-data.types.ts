export type IsGoingType = 'yes' | 'no' | 'maybe' | null; 

export type GuestData = {
    name: string;
    surname: string;
    isGoing: IsGoingType;
    isVege: boolean
}

export type Invitation ={
    id: string;
    guests: GuestData[]
}

export type GuestStoreData = {
    invitationId?: string;
    isLoading: boolean;
    guestsData?: GuestData[];
    isConfirmed: boolean;
}