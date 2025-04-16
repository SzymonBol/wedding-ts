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
import { environment } from '../../../environments/environment';
import { AuthDataStore } from '../../shared/store/auth.store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationSummaryComponent } from './confirmation-summary/confirmation-summary.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { Router, ROUTES } from '@angular/router';
import { ROUTE } from '../../shared/routes.enum';
import { LogMessageServce } from '../../services/log-message.service';

@Component({
  selector: 'app-invite-confirmation',
  standalone: true,
  imports: [MatIconModule, DietSwitchComponent, MatButtonModule, ReactiveFormsModule, FormsModule, MatTableModule, GuestConfirmationStatusComponent, MatRadioModule],
  templateUrl: './invite-confirmation.component.html',
  styleUrl: './invite-confirmation.component.scss',
  animations: [
    trigger('highlightElement', [
      state(
        'scrolled',
        style({
          backgroundColor: '#e7ab29'
        }),
      ),
      state(
        'normal',
        style({
          backgroundColor: '#885208'
        }),
      ),
      transition('normal => scrolled', [animate('0.6s')]),
      transition('scrolled => normal', [animate('0.6s')]),
    ]),
  ],
})
export class InviteConfirmationComponent {
  private store = inject(GuestDataStore);
  private logMessageSrv = inject(LogMessageServce);
  private dialogServ = inject(MatDialog);
  private invitationService = inject(InvitationService);
  private _snackBar = inject(MatSnackBar);
  protected fb = inject(FormBuilder);
  protected router = inject(Router);
  protected isUserLoggedIn = inject(AuthDataStore).isUserLoggedIn;

  isConfirmedSig = this.store.confirmed;
  comment = this.store.comment();
  guestsSig = this.store.guestsData!;
  canEditBasedOnDate = this.getCanEditByDate();
  editModeSig = signal<boolean>(!this.isConfirmedSig());
  needAccommodation = this.store.needAccommodation();
  enviroment = environment;
  buttonState = signal('normal');

  form = this.fb.group(
    {
      guests : this.fb.array<GuestData>([]),
      needAccommodation: [false],
      comment: [''],
    }
  )

  editModeEff = effect(() => {
    this.isConfirmedSig();
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
    const guestsData = this.guestsSig()
    if(guestsData){
      this.logMessageSrv.logMessage({text: 'Activate edit mode '+ guestsData[0].name +' '+ guestsData[0].surname, severity: 'info'});
    }
   
    $event.preventDefault();
    this.editModeSig.set(true);
  }

  async updateData() {
    if(this.form.controls.guests.value.length === 2 
      && this.form.controls.guests.value[1]?.isGoing === true
      && this.form.controls.guests.value[0]?.isGoing === false 
      && this.form.controls.guests.value[1]?.name === 'Osoba' 
      && this.form.controls.guests.value[1]?.surname === 'Towarzysząca'){
        const osTowarzyszaca = this.form.controls.guests.at(1).value as GuestData;
        this.form.controls.guests.at(1).setValue({...osTowarzyszaca, isGoing : false});
    }

    const {guests, comment, needAccommodation} = this.form.value;
    if(!isGuestDataArrayType(guests)) return;


    const invitationId = this.store.invitationId ? this.store.invitationId() : null;
    if(invitationId){
      const invitation : Invitation = {
        id: invitationId,
        guests: guests,
        comment: comment ?? '',
        confirmed: true,
        needAccommodation: needAccommodation ? true : false
      }

      const activeElement = document.activeElement as HTMLElement;
      if (activeElement) {
        activeElement.blur();
      }
      
      const dialogRef = this.dialogServ.open(ConfirmationSummaryComponent, {data: invitation});

      dialogRef.afterClosed().subscribe( async result => {
        if(result){
          try{
            this.store.loadingData();
            await firstValueFrom(this.invitationService.updateInvitationData(invitation));
            this.store.updateConfirmation(true);
            this.editModeSig.set(false);
            this.store.finishLoading();
          }
          catch (e){
            this._snackBar.open('Bład zapisu', 'OK');
            this.editModeSig.set(true);
          }
        }
      });
    }


  }

  getCanEditByDate(): boolean{
    const confirmationDate = new Date(environment.lastConfirmationDate);
    const currentDate = new Date();

    return confirmationDate.getTime() - currentDate.getTime()> 0;
  }

  scrollIntoButton(){
    this.logMessageSrv.logMessage({text: 'Clicked save invitation in instruction', severity: 'info'});
    let count = 0;

    if(this.buttonState() === 'normal'){
      this.buttonState.set('scrolled');
    } else {
      this.buttonState.set('normal');
    }
    count++;

    const interval = setInterval(() => {
      if(this.buttonState() === 'normal'){
        this.buttonState.set('scrolled');
      } else {
        this.buttonState.set('normal');
      }
      count++;

      if(count > 3){
        this.buttonState.set('normal');
        clearInterval(interval);
      }
    }, 600);
    const elem= document.getElementById('save-button');
    elem?.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
  }

  navigateToHomePage(){
    this.logMessageSrv.logMessage({text: 'Redirect to home page from invite confirmation', severity: 'info'});
    this.router.navigateByUrl(ROUTE.HOME);
  }
}
