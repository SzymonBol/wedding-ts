import {
  Component,
  computed,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { PartyScheduleItem } from "./types/party-schedule.type";
import { MatIcon } from "@angular/material/icon";
import { ScheduleHttpSrv } from '../../../services/schedule-http.service';
import { ToHoursPipe } from "./pipe/to-hours.pipe";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-party-schedule',
    standalone: true,
    imports: [
    MatIcon,
    ToHoursPipe
],
    templateUrl: './party-schedule.component.html',
    styleUrl: './party-schedule.component.scss'
})
export class PartyScheduleComponent implements OnInit{
  private scheduleServ = inject(ScheduleHttpSrv);
  schedule = this.scheduleServ.scheduleItems;

  async ngOnInit() {
    console.log('init fetching')
    try{
      await this.scheduleServ.fetchSchedule();
    } catch (err){
      console.log('error');
      console.error(err);
      const a = err as HttpErrorResponse;
      console.log(a.error);
    }
    
  }
}
