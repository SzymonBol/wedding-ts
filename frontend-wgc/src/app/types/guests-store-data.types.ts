export type GuestData = {
    name: string;
    surname: string;
    isGoing: boolean;
    isVege: boolean
}

export type Invitation ={
    id: string;
    guests: GuestData[];
    confirmed: boolean;
    comment: string | null;
    needAccommodation: boolean;
}

export type GuestStoreData = {
    invitationId?: string;
    isLoading: boolean;
    guestsData?: GuestData[];
    confirmed: boolean;
    comment: string | null;
    needAccommodation: boolean;
}

export const isGuestDataArrayType = (value: any) :value is GuestData[] =>{
    console.log(value[0]);
    return value && value.length > 0 && 'name' in value[0] && 'surname' in value[0] && 'isGoing' in value[0] && 'isVege' in value[0];
} 