import { Component, effect, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { GuestDataStore } from '../../../shared/store/guest-panel.store';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ROUTE } from '../../../shared/routes.enum';

@Component({
  selector: 'app-enter-code',
  standalone: true,
  imports: [MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './enter-code.component.html',
  styleUrl: './enter-code.component.scss'
})
export class EnterCodeComponent {
  code = '';
  store = inject(GuestDataStore);
  router = inject(Router);
  readonly dialogServ = inject(MatDialog);
  
  guestDataEff = effect(() => {
    const guestData = this.store.guestsData;
    if(!guestData || !guestData()) return;

    if(this.store.invitationId && this.store.invitationId())
      this.router.navigateByUrl(`${ROUTE.INVITE_CONFIRMATION}`)
  }, {allowSignalWrites: true})
  
  checkInvitationCode() {
   this.store.fetchInvitationDataById(this.code.trim());
  }
}
