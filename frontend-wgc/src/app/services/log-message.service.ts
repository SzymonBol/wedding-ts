import { HttpClient, HttpResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable } from "rxjs";
import { LogMessage } from "../types/log-message.type";

@Injectable({
  providedIn: 'root'
})
export class LogMessageServce{

    private http = inject(HttpClient);

    public async logMessage(message: LogMessage ) : Promise<void>{
        try{
            return await firstValueFrom(this.http.post<void>('/log-message', message, { withCredentials: true }));
        } catch(err){
            console.error('Cannot log message' + message.text);
            return;
        }
    }
}