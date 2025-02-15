import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { PartyScheduleItem } from "../guest-panel/home/party-schedule/types/party-schedule.type";
import { firstValueFrom } from "rxjs";

@Injectable(
    {providedIn: 'root'}
)
export class ScheduleHttpSrv{
    private http = inject(HttpClient);
    private _scheduleItems = signal<PartyScheduleItem[]>([]);
    public scheduleItems = computed(()=> {
        return this._scheduleItems().sort((a,b) => a.time < b.time ? -1 : 1);
    })


     public async fetchSchedule(){
        const schedule = await firstValueFrom(this.http.get<PartyScheduleItem[]>('/schedule'));
        this._scheduleItems.set(schedule);
    }

    public createSchedulePoint(item: PartyScheduleItem){
        return this.http.post('/create-schedule-point', item);
    }

    public deleteScheduleItem(item: PartyScheduleItem){
        return this.http.delete(`/delete-schedule-point/${item._id}`);
    }
}