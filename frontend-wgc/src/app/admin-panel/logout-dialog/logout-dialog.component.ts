import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { HttpAuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { ROUTE } from '../../shared/routes.enum';
import { AuthDataStore } from '../../shared/store/auth.store';

@Component({
  selector: 'app-logout-dialog',
  standalone: true,
  imports: [    
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './logout-dialog.component.html',
  styleUrl: './logout-dialog.component.scss'
})
export class LogoutDialogComponent {
  readonly dialogRef = inject(MatDialogRef<LogoutDialogComponent>);
  readonly authService = inject(HttpAuthService);
  readonly router = inject(Router);
  readonly authStore = inject(AuthDataStore);


  onNoClick(): void {
    this.dialogRef.close();
  }

  async confirmLogout(): Promise<void> {
    await firstValueFrom(this.authService.logout());
    this.router.navigateByUrl(ROUTE.HOME);
    this.authStore.updateLoginStatus({isFine: false, user: null});
    this.dialogRef.close();
  }
}
