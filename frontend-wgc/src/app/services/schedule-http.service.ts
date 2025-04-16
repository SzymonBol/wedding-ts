import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { PartyScheduleItem } from "../guest-panel/home/party-schedule/types/party-schedule.type";
import { firstValueFrom } from "rxjs";
import { LogMessageServce } from "./log-message.service";

@Injectable(
    {providedIn: 'root'}
)
export class ScheduleHttpSrv{
    private http = inject(HttpClient);
    private _scheduleItems = signal<PartyScheduleItem[]>([]);
    private logMessageSrv = inject(LogMessageServce);
    public scheduleItems = computed(()=> {
        return this._scheduleItems().sort((a,b) => a.time < b.time ? -1 : 1);
    })


     public async fetchSchedule(){
        try{
            const schedule = await firstValueFrom(this.http.get<PartyScheduleItem[]>('/schedule'));
            this.logMessageSrv.logMessage({text: `Received schedule ${schedule.length} items`, severity: 'info'});
            this._scheduleItems.set(schedule);
        } catch(err){
            console.error(err);
        }
    }

    public createSchedulePoint(item: PartyScheduleItem){
        return this.http.post('/create-schedule-point', item);
    }

    public updateSchedulePoint(item: PartyScheduleItem, id: string){
        return this.http.put('/update-schedule-point/'+id, item);
    }

    public deleteScheduleItem(id: string){
        return this.http.delete(`/delete-schedule-point/${id}`);
    }
}