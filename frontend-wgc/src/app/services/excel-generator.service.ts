import { Injectable } from "@angular/core";
import { GuestsTableData } from "../types/admin-panel.types";
import * as XLSX from 'xlsx';
import { GuestData } from "../types/guests-store-data.types";

export interface FlatGuestData {
  name: string;
  surname: string;
  isGoing: string;
  isVege: string;
  accommodation: string;
  comment: string | null;
  confirmed: string;
}

@Injectable({providedIn : 'root'})
export class ExcelGenerator{
    generate(data : GuestsTableData[]){
        const sheetData = this.flattenGuestsData(data);

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(sheetData);
        
        XLSX.utils.book_append_sheet(workbook, worksheet, "Goście");
        XLSX.utils.sheet_add_aoa(worksheet, [["Imię", "Nazwisko", 
            "Będzie", "Dieta", "Nocleg", "Komentarz", "Potwierdzili"]], { origin: "A1" });
        XLSX.writeFile(workbook, "wesele.xlsx");
    }

    private flattenGuestsData(data: GuestsTableData[]): FlatGuestData[] {
        return data.flatMap(entry =>
            entry.guests.map((guest: GuestData) => ({
            name: guest.name,
            surname: guest.surname,
            isGoing: guest.isGoing ? 'TAK' : 'NIE',
            isVege: guest.isVege ? 'VEGE' : '',
            accommodation: entry.accommodation,
            comment: entry.comment,
            confirmed: entry.confirmed ? 'TAK' : 'NIE',
            }))
        );
    }

}