import { HttpClient, HttpResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthCredentials } from "../types/auth.types";
import { Observable } from "rxjs";

@Injectable(
    {providedIn: 'root'}
)
export class AuthService{
    private http = inject(HttpClient);

    public login(credentials: AuthCredentials) : Observable<HttpResponse<void>>{
        return this.http.post<void>('/login-user', credentials, { observe: 'response' });
    }
}