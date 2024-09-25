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
  private activateRoute = inject(ActivatedRoute);
  isConfirmedSig = this.store.confirmed;
  comment = this.store.comment();
  guestsSig = this.store.guestsData!;
  editModeSig = signal<boolean>(false);

  constructor() {
    const id = this.activateRoute.snapshot.queryParamMap.get('id');
    //TODO to przenieść do guarda
    if (id)
      this.store.fetchInvitationDataById(id);

    effect(()=>{
      this.comment = this.store.comment();
    })

    effect(()=>{
      console.log(!this.isConfirmedSig());
      this.editModeSig.set(!this.isConfirmedSig());
    }, {allowSignalWrites: true})
  }

  changeEditMode(){
    this.editModeSig.update(e => !e)
  }

  updateData() {
    this.store.updateConfirmation(true);
    console.log(this.store.confirmed());
    console.log(this.editModeSig());
  }
}
