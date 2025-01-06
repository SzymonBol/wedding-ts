import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../../../environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-invitation-base-info',
  standalone: true,
  imports: [MatButtonModule, DatePipe],
  templateUrl: './invitation-base-info.component.html',
  styleUrl: './invitation-base-info.component.scss'
})
export class InvitationBaseInfoComponent {

  protected envitoment = environment;
}
