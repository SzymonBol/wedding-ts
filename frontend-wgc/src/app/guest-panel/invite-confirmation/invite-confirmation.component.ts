import { AfterViewInit, Component, effect, inject, signal } from '@angular/core';
import { GuestDataStore } from '../../shared/store/guest-panel.store';
import { JsonPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DietSwitchComponent } from "../../shared/components/diet-switch/diet-switch.component";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { GuestConfirmationStatusComponent } from "../../shared/components/guest-confirmation-status/guest-confirmation-status.component";
import { InvitationService } from '../../services/invitation-service.service';
import { firstValueFrom } from 'rxjs';
import { Invitation } from '../../types/guests-store-data.types';
import {MatRadioModule} from '@angular/material/radio';
import { EnterCodeComponent } from "./enter-code/enter-code.component";

@Component({
  selector: 'app-invite-confirmation',
  standalone: true,
  imports: [JsonPipe, MatIconModule, DietSwitchComponent, MatButtonModule, ReactiveFormsModule, FormsModule, MatTableModule, GuestConfirmationStatusComponent, MatRadioModule, EnterCodeComponent],
  templateUrl: './invite-confirmation.component.html',
  styleUrl: './invite-confirmation.component.scss'
})
export class InviteConfirmationComponent {
  store = inject(GuestDataStore);
  isConfirmedSig = this.store.confirmed;
  comment = this.store.comment();
  guestsSig = this.store.guestsData!;
  editModeSig = signal<boolean>(!this.isConfirmedSig());
  InvitationService = inject(InvitationService);
  needAccommodation = this.store.needAccommodation();

  newDataEffect = effect(() => {
    if(this.guestsSig()){
      this.editModeSig.set(!this.isConfirmedSig);
      this.comment = this.store.comment();
      this.needAccommodation = this.store.needAccommodation();
    }
  }, {allowSignalWrites: true})

  activeEditMode($event: Event){
    $event.preventDefault();
    this.editModeSig.set(true);
  }

  async updateData() {
    this.editModeSig.set(false);
    const invitationId = this.store.invitationId ? this.store.invitationId() : null;
    if(invitationId){
      const invitation : Invitation = {
        id: invitationId,
        guests: this.guestsSig()!,
        comment: this.comment,
        confirmed: true,
        needAccommodation: this.needAccommodation
      }

      await firstValueFrom(this.InvitationService.updateInvitationData(invitation));
      this.store.updateConfirmation(true);
    }
  }
}
