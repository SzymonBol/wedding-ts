import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CreateInvitationDialogComponent } from './dialog/dialog.component';


@Component({
  selector: 'app-create-invitation',
  standalone: true,
  imports: [MatIconModule, MatButtonModule ],
  templateUrl: './create-invitation.component.html',
  styleUrl: './create-invitation.component.scss'
})
export class CreateInvitationComponent {
  readonly dialogServ = inject(MatDialog);

  openDialog(){
    this.dialogServ.open(CreateInvitationDialogComponent);
  }
}
