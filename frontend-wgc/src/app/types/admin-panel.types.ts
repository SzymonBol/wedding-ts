import { GuestData } from "./guests-store-data.types";

export interface GoingGuestCount{
    allGuests: number;
    goingGuests: number
}

export interface VegeGuestCount{
    meatGuests: number;
    vegeGuests: number
}

export interface GuestsTableData{
    qrCodeUrl: string;
    code: string;
    guests: GuestData[];
    goingGuests: GoingGuestCount;
    dietCount: VegeGuestCount;
    accommodation: string;
    comment: string | null;
    confirmed: boolean;
}