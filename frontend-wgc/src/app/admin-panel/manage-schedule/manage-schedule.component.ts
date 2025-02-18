import { Component, inject } from '@angular/core';
import { ScheduleHttpSrv } from '../../services/schedule-http.service';
import { PartyScheduleComponent } from "../../guest-panel/home/party-schedule/party-schedule.component";
import { MatIcon } from '@angular/material/icon';
import { ToHoursPipe } from "../../guest-panel/home/party-schedule/pipe/to-hours.pipe";
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleItemDialogComponent } from './schedule-item-dialog/schedule-item-dialog.component';
import { PartyScheduleItem } from '../../guest-panel/home/party-schedule/types/party-schedule.type';

@Component({
  selector: 'app-manage-schedule',
  standalone: true,
  imports: [PartyScheduleComponent, MatIcon, ToHoursPipe, MatButtonModule],
  templateUrl: './manage-schedule.component.html',
  styleUrl: './manage-schedule.component.scss'
})
export class ManageScheduleComponent {
  readonly dialogServ = inject(MatDialog);
  private scheduleSrv = inject(ScheduleHttpSrv);
  items = this.scheduleSrv.scheduleItems;

  openAddDialog(){
    this.dialogServ.open(ScheduleItemDialogComponent);
  }

  openEditDialog(scheduleItem: PartyScheduleItem){
    this.dialogServ.open(ScheduleItemDialogComponent,  {
      data: scheduleItem,
    });
    
  }

}
