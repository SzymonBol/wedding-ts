import { Component, effect, inject, signal } from '@angular/core';
import { GuestDataStore } from '../../shared/store/guest-panel.store';
import { MatIconModule } from '@angular/material/icon';
import { DietSwitchComponent } from "../../shared/components/diet-switch/diet-switch.component";
import { ReactiveFormsModule, FormsModule, FormBuilder, FormArray } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { GuestConfirmationStatusComponent } from "../../shared/components/guest-confirmation-status/guest-confirmation-status.component";
import { InvitationService } from '../../services/invitation-service.service';
import { firstValueFrom } from 'rxjs';
import { GuestData, Invitation, isGuestDataArrayType } from '../../types/guests-store-data.types';
import {MatRadioModule} from '@angular/material/radio';
import { EnterCodeComponent } from "./enter-code/enter-code.component";
import { environment } from '../../../environments/environment';
import { AuthDataStore } from '../../shared/store/auth.store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ROUTE } from '../../shared/routes.enum';

@Component({
  selector: 'app-invite-confirmation',
  standalone: true,
  imports: [MatIconModule, DietSwitchComponent, MatButtonModule, ReactiveFormsModule, FormsModule, MatTableModule, GuestConfirmationStatusComponent, MatRadioModule, EnterCodeComponent],
  templateUrl: './invite-confirmation.component.html',
  styleUrl: './invite-confirmation.component.scss'
})
export class InviteConfirmationComponent {
  store = inject(GuestDataStore);
  isConfirmedSig = this.store.confirmed;
  comment = this.store.comment();
  guestsSig = this.store.guestsData!;
  canEditBasedOnDate = this.getCanEditByDate();
  editModeSig = signal<boolean>(!this.isConfirmedSig());
  InvitationService = inject(InvitationService);
  needAccommodation = this.store.needAccommodation();
  isUserLoggedIn = inject(AuthDataStore).isUserLoggedIn;
  enviroment = environment;
  private _snackBar = inject(MatSnackBar);
  router = inject(Router);

  fb = inject(FormBuilder);
  form = this.fb.group(
    {
      guests : this.fb.array<GuestData>([]),
      needAccommodation: [false],
      comment: [''],
    }
  )

  editModeEff = effect(() => {
    if(this.editModeSig()){
      this.form.controls.comment.enable();
      this.form.controls.needAccommodation.enable()
    } else {
      this.form.controls.comment.disable();
      this.form.controls.needAccommodation.disable()
    }
  })

  newDataEffect = effect(() => {
    if(this.guestsSig()){
      this.comment = this.store.comment();
      this.needAccommodation = this.store.needAccommodation();
    }

    this.form.controls.comment.setValue(this.store.comment())
    this.form.controls.needAccommodation.setValue(this.store.needAccommodation());

    this.guestsSig()?.forEach( g => {
      const guest = this.fb.group({
        name: [g.name],
        surname: [g.surname],
        isVege: [g.isVege],
        isGoing: [g.isGoing]
      })

      this.guests.push(guest);
    })

  }, {allowSignalWrites: true})

    get guests() {
      return this.form.controls["guests"] as FormArray;
    }

  

  activeEditMode($event: Event){
    $event.preventDefault();
    this.editModeSig.set(true);
  }

  async updateData() {
    const {guests, comment, needAccommodation} = this.form.value;
    if(!isGuestDataArrayType(guests)) return;

    try{
      this.store.loadingData();
      const invitationId = this.store.invitationId ? this.store.invitationId() : null;
      if(invitationId){
        const invitation : Invitation = {
          id: invitationId,
          guests: guests,
          comment: comment ?? '',
          confirmed: true,
          needAccommodation: needAccommodation ? true : false
        }
        
        await firstValueFrom(this.InvitationService.updateInvitationData(invitation));
        this.store.updateConfirmation(true);
        this.store.finishLoading();
        this.editModeSig.set(false);
      }
    }
    catch (e){
      this.store.finishLoading();
      this._snackBar.open('Bład zapisu', 'OK');
      this.editModeSig.set(true);
    }
  }

  getCanEditByDate(): boolean{
    const confirmationDate = new Date(environment.lastConfirmationDate);
    const currentDate = new Date();

    return confirmationDate.getTime() - currentDate.getTime()> 0;
  }
}
