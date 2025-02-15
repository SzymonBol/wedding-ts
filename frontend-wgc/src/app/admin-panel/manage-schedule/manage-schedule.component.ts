import { Component, inject, OnInit } from '@angular/core';
import { ScheduleHttpSrv } from '../../services/schedule-http.service';
import { PartyScheduleComponent } from "../../guest-panel/home/party-schedule/party-schedule.component";
import { MatIcon } from '@angular/material/icon';
import { ToHoursPipe } from "../../guest-panel/home/party-schedule/pipe/to-hours.pipe";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-manage-schedule',
  standalone: true,
  imports: [PartyScheduleComponent, MatIcon, ToHoursPipe, MatButtonModule],
  templateUrl: './manage-schedule.component.html',
  styleUrl: './manage-schedule.component.scss'
})
export class ManageScheduleComponent implements OnInit {

  private scheduleSrv = inject(ScheduleHttpSrv);
  items = this.scheduleSrv.scheduleItems;

  ngOnInit(): void {
    if(this.items.length === 0){
      this.scheduleSrv.fetchSchedule();
    }
  }

}
