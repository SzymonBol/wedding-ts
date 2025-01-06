import { Component, computed, inject } from '@angular/core';
import { AdminStore } from '../../shared/store/admin.store';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-guest-summary',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './guest-summary.component.html',
  styleUrl: './guest-summary.component.scss'
})
export class GuestSummaryComponent {
  private invitations = inject(AdminStore).entities;

  summaryData = computed(() => {
    const invitationsData = this.invitations();
    let confirmedCount = 0;
    let vegeCount = 0;
    let meatCount = 0;
    let goingGuest = 0;
    let refusedGuest = 0;
    let notConfirmedGuestsCount = 0;
    let needAccommodationCount =0;
    let allGuestsCount = 0;

    if(invitationsData){
      invitationsData.forEach(invitation => {
        if(invitation.confirmed){
          invitation.guests.forEach(guest => {
            if(guest.isGoing) {
              goingGuest++;
              if(guest.isVege) vegeCount++; else meatCount ++;
              
              if(invitation.needAccommodation) needAccommodationCount++;
            } else refusedGuest++;
            
            confirmedCount++;
            allGuestsCount++;
          })
        } else {
          invitation.guests.forEach(() => {
            notConfirmedGuestsCount++;
            allGuestsCount++;
          })
        }
      })
    }

    return {
      confirmedCount,
      notConfirmedGuestsCount,
      goingGuest,
      refusedGuest,
      meatCount,
      vegeCount,
      needAccommodationCount,
      allGuestsCount
    }
  })
}
