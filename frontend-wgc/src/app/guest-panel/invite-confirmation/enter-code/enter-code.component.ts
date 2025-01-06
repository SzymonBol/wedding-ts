import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { GuestDataStore } from '../../../shared/store/guest-panel.store';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

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

  checkInvitationCode() {
    this.store.fetchInvitationDataById(this.code);
  }
}
