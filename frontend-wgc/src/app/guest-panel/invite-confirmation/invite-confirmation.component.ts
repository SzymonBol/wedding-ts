import { Component, inject } from '@angular/core';
import { GuestDataStore } from '../../shared/store/guest-panel.store';
import { JsonPipe } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DietSwitchComponent } from "../../shared/components/diet-switch/diet-switch.component";
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-invite-confirmation',
  standalone: true,
  imports: [JsonPipe, MatIconModule, DietSwitchComponent, MatButtonModule, ReactiveFormsModule, FormsModule, MatTableModule],
  templateUrl: './invite-confirmation.component.html',
  styleUrl: './invite-confirmation.component.scss'
})
export class InviteConfirmationComponent {
  store = inject(GuestDataStore);
  private activateRoute = inject(ActivatedRoute);


  guestsSig = this.store.guestsData!;
  displayedColumns: string[] = ['isGoing', 'nameAndSurname', 'diet'];

  form = new FormGroup(
    {
      isVege: new FormControl(false, [Validators.required, Validators.requiredTrue])
    }
  )

  constructor() {
    const id = this.activateRoute.snapshot.queryParamMap.get('id');
    if (id)
      this.store.fetchInvitationDataById(id);
  }

  submit() {
    console.log(this.form.value);
  }
}
