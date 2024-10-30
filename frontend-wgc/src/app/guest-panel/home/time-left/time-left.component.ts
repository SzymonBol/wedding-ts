import { Component, OnInit, signal } from '@angular/core';
import { TimerDate } from './types/timer-date.type';

@Component({
  selector: 'app-time-left',
  standalone: true,
  imports: [],
  templateUrl: './time-left.component.html',
  styleUrl: './time-left.component.scss'
})
export class TimeLeftComponent implements OnInit{
    weddingDate = new Date('2025-07-26T15:00:00+0200').getTime();
    timeLeft = signal<TimerDate>({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    })


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
