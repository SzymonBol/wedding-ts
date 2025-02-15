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

  ngOnInit() {
    this.scheduleServ.fetchSchedule();
  }
}
