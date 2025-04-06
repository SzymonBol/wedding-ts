import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { ScheduleHttpSrv } from '../../../services/schedule-http.service';
import { ToHoursPipe } from "./pipe/to-hours.pipe";

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
  protected schedule = this.scheduleServ.scheduleItems;

  async ngOnInit() {
    try{
      await this.scheduleServ.fetchSchedule();
    } catch (err){
      console.error(err);
    }
  }
}
