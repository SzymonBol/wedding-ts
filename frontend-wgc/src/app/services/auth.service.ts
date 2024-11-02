import { HttpClient, HttpResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthCredentials, LoginResponse } from "../types/auth.types";
import { Observable } from "rxjs";

@Injectable(
    {providedIn: 'root'}
)
export class HttpAuthService{
    private http = inject(HttpClient);

    public login(credentials: AuthCredentials) : Observable<HttpResponse<LoginResponse>>{
        return this.http.post<LoginResponse>('/login-user', credentials, { observe: 'response', withCredentials: true });
    }

    public checkSession() : Observable<LoginResponse>{
        return this.http.get<LoginResponse>('/check-session');
    }

    public logout() : Observable<void>{
        return this.http.get<void>('/logout');
    }
}