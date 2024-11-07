import {
  Component,
  computed,
  OnInit,
  signal
} from '@angular/core';
import { PartyScheduleItem } from "./types/party-schedule.type";
import { MatIcon } from "@angular/material/icon";
import { NgClass } from "@angular/common";

const MOCK_SCHEDULE: PartyScheduleItem[] = [
  {
    time: '15:00',
    position: "left",
    description: 'ceremonia ceremonia ceremonia ceremonia ceremonia ceremonia ceremonia ceremonia ceremonia ceremonia ceremonia ceremonia ceremonia ceremonia ceremonia ',
    icon: 'church'
  },
  {
    time: '18:00',
    position: "left",
    description: 'życzenia',
    icon: 'message'
  },
  {
    time: '17:00',
    position: "right",
    description: 'rosół',
    icon: 'dinner'
  },
  {
    time: '19:00',
    position: "right",
    description: 'zabawa',
    icon: 'dancer'
  }
]

@Component({
  selector: 'app-party-schedule',
  standalone: true,
  imports: [
    MatIcon,
    NgClass
  ],
  templateUrl: './party-schedule.component.html',
  styleUrl: './party-schedule.component.scss'
})
export class PartyScheduleComponent implements OnInit{
  private _schedule = signal<PartyScheduleItem[]>([]);

  public schedule = computed(() =>{
    return this._schedule().sort((a,b) => a.time < b.time ? -1 : 1);
  })

  ngOnInit() {
    this._schedule.set(MOCK_SCHEDULE);
  }
}
