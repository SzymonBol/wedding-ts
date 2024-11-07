export interface SittingPlaces {
  tableNumber: number;
  guestsSitting: TableGuest[];
}

export interface TableGuest{
  name: string;
  surname: string;
  countWithPartner: boolean;
}
