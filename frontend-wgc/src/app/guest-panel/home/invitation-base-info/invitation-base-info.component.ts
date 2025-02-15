import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../../../environments/environment';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ROUTE } from '../../../shared/routes.enum';

@Component({
  selector: 'app-invitation-base-info',
  standalone: true,
  imports: [MatButtonModule, DatePipe],
  templateUrl: './invitation-base-info.component.html',
  styleUrl: './invitation-base-info.component.scss'
})
export class InvitationBaseInfoComponent {

  private router = inject(Router);
  protected envitoment = environment;

  navigateToConfirmation(){
    this.router.navigateByUrl(ROUTE.INVITE_CONFIRMATION);
  }
}
