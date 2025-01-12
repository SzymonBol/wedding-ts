import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  untracked,
  viewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { GuestData } from '../../types/guests-store-data.types';
import { ROUTE } from '../../shared/routes.enum';
import { MatIconModule } from '@angular/material/icon';
import { QRCodeModule } from 'angularx-qrcode';
import {
  GoingGuestCount,
  GuestsTableData,
  VegeGuestCount,
} from '../../types/admin-panel.types';
import { GoingGuestsCountComponent } from '../going-guests-count/going-guests-count.component';
import { VegeMeatCountComponent } from '../vege-meat-count/vege-meat-count.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { AdminStore } from '../../shared/store/admin.store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GuestAdminService } from '../../services/guest-admin.service';
import { firstValueFrom } from 'rxjs';
import { ConfirmationDialogService } from '../confirmation-dialog/service/confirmation-dialog.service';
import { ConfrimationDialogData } from '../../types/confirmation-dialog-data.types';
import { Router } from '@angular/router';
import { PrintService } from '../../services/print.service';

@Component({
  selector: 'app-admin-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    QRCodeModule,
    GoingGuestsCountComponent,
    VegeMeatCountComponent,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [PrintService],
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminTableComponent {
  router = inject(Router);
  guestAdminService = inject(GuestAdminService);
  adminStore = inject(AdminStore);
  printService = inject(PrintService);
  guests = this.adminStore.entities;
  guestsTableData = computed<GuestsTableData[]>(() => {
    return this.guests().map((invitation) => {
      return {
        qrCodeUrl: this.buildQrCodeUrl(invitation.id),
        code: invitation.id,
        guests: invitation.guests,
        goingGuests: this.countGoingGuests(invitation.guests),
        dietCount: this.countVegeDiet(invitation.guests),
        accommodation: this.accommodationText(invitation.needAccommodation),
        comment: invitation.comment,
        confirmed: invitation.confirmed,
      };
    });
  });

  private _snackBar = inject(MatSnackBar);
  private confirmationDialogService = inject(ConfirmationDialogService);

  displayedColumns: string[] = [
    'qrCodeUrl',
    'guests',
    'goingGuests',
    'dietCount',
    'accommodation',
    'comment',
    'confirmed',
    'options',
  ];
  paginator = viewChild(MatPaginator);
  sort = viewChild(MatSort);
  dataSource = new MatTableDataSource<GuestsTableData>([]);

  dataSourceEff = effect(() => {
    const data = this.guestsTableData();
    const paginator = this.paginator() ?? null;
    const sort = this.sort() ?? null;

    untracked(() => {
      this.dataSource.data = data;
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = paginator;
      this.dataSource.sort = sort;
    });
  });

  editInvitation(id: string) {
    this.router.navigate([ROUTE.INVITE_CONFIRMATION], { queryParams: { id } });
  }

  openDeleteDialog(id: string, guests: GuestData[]) {
    const guestsNames = this.getGuestsNamesToString(guests);

    const config: ConfrimationDialogData = {
      header: 'Czy na pewno chcesz usunąć zaproszenie?',
      text: `Zaproszenie dla ${guestsNames} zostanie usunięte. Tej operacji nie można odwrócić.`,
      confirmFn: () => this.deleteInvitation(id),
      rejectFn: () => {},
    };
    this.confirmationDialogService.open(config);
  }

  async deleteInvitation(id: string) {
    try {
      const result = await firstValueFrom(
        this.guestAdminService.deleteInvitation(id)
      );
      this.adminStore.removeInvitation(id);
      this._snackBar.open('Noi usnięte...', 'OK');
    } catch (e) {
      this._snackBar.open('Błąd', 'Nie OK');
      console.error(e);
    }
  }

  private getGuestsNamesToString(guests: GuestData[]) {
    return guests.map((g) => `${g.name} ${g.surname}`).join(', ');
  }

  private buildQrCodeUrl(id: string) {
    return `${window.location.host}${ROUTE.INVITE_CONFIRMATION}?id=${id}`;
  }

  private countGoingGuests(guests: GuestData[]): GoingGuestCount {
    return {
      allGuests: guests.length,
      goingGuests: guests.filter((g) => g.isGoing).length,
    };
  }

  private countVegeDiet(guests: GuestData[]): VegeGuestCount {
    return {
      meatGuests: guests.filter((g) => !g.isVege && g.isGoing).length,
      vegeGuests: guests.filter((g) => g.isVege && g.isGoing).length,
    };
  }

  private accommodationText(needAccommodation: boolean) {
    return needAccommodation ? 'NOCLEG' : '-';
  }
}
