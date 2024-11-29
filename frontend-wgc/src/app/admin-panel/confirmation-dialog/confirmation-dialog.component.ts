import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

@Component({
  selector: 'app-logout-confirmation',
  standalone: true,
  imports: [    
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: {header: string, text: string, rejectFn: () => void, confirmFn: () => void}) { }


  rejectClick(): void {
    this.data.rejectFn();
    this.dialogRef.close();
  }

  confirmLogout(): void {
    this.data.confirmFn();
    this.dialogRef.close();
  }
}
