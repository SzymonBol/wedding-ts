import { HttpClient, HttpResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthCredentials } from "../types/auth.types";
import { Observable } from "rxjs";

@Injectable(
    {providedIn: 'root'}
)
export class HttpAuthService{
    private http = inject(HttpClient);

    public login(credentials: AuthCredentials) : Observable<HttpResponse<void>>{
        return this.http.post<void>('/login-user', credentials, { observe: 'response', withCredentials: true });
    }
    public test() : Observable<void>{
        return this.http.get<void>('/test-user', {withCredentials: true});
    }
}