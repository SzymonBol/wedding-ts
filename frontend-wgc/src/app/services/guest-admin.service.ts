import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Invitation } from "../types/guests-store-data.types";

@Injectable({providedIn: 'root'})
export class GuestAdminService{
    private http = inject(HttpClient);

    public getGuests(): Observable<Invitation[]>{
        const url = '/guests';
        return this.http.get<Invitation[]>(url);
    }

    public deleteInvitation(id: string){
        const url = `/delete-invitation/${id}`;
        return this.http.delete<void>(url);
    }
}