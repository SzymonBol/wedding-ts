import { Component, effect, inject, signal } from '@angular/core';
import { GuestDataStore } from '../../shared/store/guest-panel.store';
import { JsonPipe } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DietSwitchComponent } from "../../shared/components/diet-switch/diet-switch.component";
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { GuestConfirmationStatusComponent } from "../../shared/components/guest-confirmation-status/guest-confirmation-status.component";

@Component({
  selector: 'app-invite-confirmation',
  standalone: true,
  imports: [JsonPipe, MatIconModule, DietSwitchComponent, MatButtonModule, ReactiveFormsModule, FormsModule, MatTableModule, GuestConfirmationStatusComponent],
  templateUrl: './invite-confirmation.component.html',
  styleUrl: './invite-confirmation.component.scss'
})
export class InviteConfirmationComponent {
  store = inject(GuestDataStore);
  isConfirmedSig = this.store.confirmed;
  comment = this.store.comment();
  guestsSig = this.store.guestsData!;
  editModeSig = signal<boolean>(this.isConfirmedSig());

  activeEditMode($event: Event){
    $event.preventDefault();
    setTimeout(() => window.scroll(0,0), 100);
    this.editModeSig.set(true);
  }

  updateData() {
    this.editModeSig.set(false);
    this.store.updateConfirmation(true);
  }
}
