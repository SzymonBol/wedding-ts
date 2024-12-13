import { Component, inject, OnInit, signal } from '@angular/core';
import { TimerDate } from './types/timer-date.type';
import { environment } from '../../../../environments/environment';
import { GuestDataStore } from '../../../shared/store/guest-panel.store';

@Component({
  selector: 'app-time-left',
  standalone: true,
  imports: [],
  templateUrl: './time-left.component.html',
  styleUrl: './time-left.component.scss'
})
export class TimeLeftComponent implements OnInit{
    weddingDate = new Date(environment.weddingDate).getTime();
    store = inject(GuestDataStore);

    timeLeft = signal<TimerDate>(this.seperateIntoSections(this.weddingDate - new Date().getTime()))


    ngOnInit(): void {
      this.setTimeDiffrence;
      this.startTimer(); 
    }

    startTimer(){
      setInterval(() => {
        this.setTimeDiffrence();
      },1000);
    }

    private seperateIntoSections(miliseconds : number){
      const days = Math.floor(miliseconds / 86400000);
      miliseconds -= days * 86400000;

      const hours = Math.floor(miliseconds / 3600000);
      miliseconds -= hours * 3600000;

      const minutes = Math.floor(miliseconds / 60000);
      miliseconds -= minutes * 60000;

      const seconds = Math.floor(miliseconds / 1000);
      
      return {days, hours, minutes, seconds};
    }

    private setTimeDiffrence(){
      const currentDate = new Date().getTime();
      const diffrence = Math.abs(currentDate - this.weddingDate);
      this.timeLeft.set(this.seperateIntoSections(diffrence));
    }
}
