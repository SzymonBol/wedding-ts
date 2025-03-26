import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invitation } from '../../../types/guests-store-data.types';

@Component({
  selector: 'app-confirmation-summary',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule
  ],
  templateUrl: './confirmation-summary.component.html',
  styleUrl: './confirmation-summary.component.scss'
})
export class ConfirmationSummaryComponent {
    readonly dialogRef = inject(MatDialogRef<ConfirmationSummaryComponent>);
    readonly guests = inject<Invitation>(MAT_DIALOG_DATA).guests;

    text = this.getTextBasedOnGuest();

    private getTextBasedOnGuest(){
      //zaproszenia z 1 osobą
      if(this.guests.length === 1){
         return this.guests[0].isGoing ? `${this.guests[0].name} - potwierdzasz swoje <b>przybycie</b> na wesele ?` : 
          `${this.guests[0].name} - potwierdzasz, że <b>nie będzie</b> Cię na weselu ?`
      }

      //zaproszenia 2 osobowe z os. towarzyszącą
      else if(this.guests.length === 2 && this.guests[1].name === 'Osoba' && this.guests[1].surname === 'Towarzysząca'){
        if(!this.guests[0].isGoing){
          return `${this.guests[0].name} - potwierdzasz, że <b>nie będzie</b> Cię na weselu ?`
        } else {
          return this.guests[1].isGoing ? `${this.guests[0].name} - potwierdzasz swoje <b>przybycie z osobą towarzyszącą</b> ?` : 
          `${this.guests[0].name} - potwierdzasz swoje <b>przybycie bez osoby towarzyczącej</b> ?`
        }
      }

      //zaproszenia imienne 
      else{
        let goingGuests = [];
        let notGoingGuests = [];

        for(let guest of this.guests){
          if(guest.isGoing){
            goingGuests.push(guest);
          } else{
            notGoingGuests.push(guest);
          }
        }

        if(goingGuests.length === this.guests.length){
          return 'Potwierdzasz, że <b>będziecie</b> na weselu ?'
        } else if(notGoingGuests.length === this.guests.length){
          return 'Potwierdzasz, że <b>nie będzie</b> Was na weselu ?'
        } else {
          let goingGuestsString = '';
          let notGoingGuestsString = '';
          for(let going of goingGuests){
            goingGuestsString +=`<li> ${going.name} ${going.surname} </li>`;
          }

          for(let notGoing of notGoingGuests){
            notGoingGuestsString +=`<li> ${notGoing.name} ${notGoing.surname} </li>`;
          }


          return `Potwierdasz, że na weselu <b>będzie</b>: <ul>${goingGuestsString} </ul> oraz, że <b>nie pojawi</b> się: <ul> ${notGoingGuestsString} </ul>`;
        }
      }
    }
  
  }
