import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Invitation } from "../types/guests-store-data.types";

@Injectable({providedIn: 'root'})
export class GuestService{
    private http = inject(HttpClient);

    public getGuests(): Observable<Invitation[]>{
        const url = '/guests';
        return this.http.get<Invitation[]>(url);
    }
}