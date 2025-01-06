import { Component, inject } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { Router } from '@angular/router';
import { ROUTE } from '../../shared/routes.enum';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogService } from '../confirmation-dialog/service/confirmation-dialog.service';

@Component({
  selector: 'app-top-section',
  standalone: true,
  imports: [MatIcon, MatButtonModule],
  templateUrl: './top-section.component.html',
  styleUrl: './top-section.component.scss'
})
export class TopSectionComponent {
  private router = inject(Router);
  readonly confirmationDialogService = inject(ConfirmationDialogService);

  backToHome(){
    this.router.navigateByUrl(ROUTE.HOME);
  }

  logout(){
    this.confirmationDialogService.logout();
  }

}
