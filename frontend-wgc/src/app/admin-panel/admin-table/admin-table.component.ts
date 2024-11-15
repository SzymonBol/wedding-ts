import { Component, computed, effect, inject, signal } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { GuestService } from '../../services/guest-admin.service';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { GuestData, Invitation } from '../../types/guests-store-data.types';
import { ROUTE } from '../../shared/routes.enum';
import { MatIconModule } from '@angular/material/icon';
import { QRCodeModule } from 'angularx-qrcode';
import { GoingGuestCount, GuestsTableData, VegeGuestCount } from '../../types/admin-panel.types';
import { GoingGuestsCountComponent } from "../going-guests-count/going-guests-count.component";
import { VegeMeatCountComponent } from "../vege-meat-count/vege-meat-count.component";
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-admin-table',
  standalone: true,
  imports: [MatTableModule, MatIconModule, QRCodeModule, GoingGuestsCountComponent, VegeMeatCountComponent, MatButtonModule],
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.scss'
})
export class AdminTableComponent {
  guestsService = inject(GuestService);
  guests = signal<Invitation[]>([]);
  displayedColumns: string[] = ['qrCodeUrl', 'guests', 'goingGuests', 'dietCount', 'accommodation', 'comment', 'confirmed', 'options'];

  guestsTableData = computed<GuestsTableData[]>(() => {
    return this.guests().map(invitation => {
      return {
        qrCodeUrl: this.buildQrCodeUrl(invitation.id),
        code: invitation.id,
        guests: invitation.guests,
        goingGuests: this.countGoingGuests(invitation.guests),
        dietCount: this.countVegeDiet(invitation.guests),
        accommodation: this.accommodationText(invitation.needAccommodation),
        comment: invitation.comment,
        confirmed: invitation.confirmed,
      }
    })
  });

  async ngOnInit(){
    this.guests.set(await firstValueFrom(this.guestsService.getGuests()));
  }

  editInvitation(id: string){

  }

  private buildQrCodeUrl(id: string){
    return `${window.location.host}${ROUTE.INVITE_CONFIRMATION}?id=${id}`;
  }

  private countGoingGuests(guests: GuestData[]): GoingGuestCount{
    return {
      allGuests: guests.length,
      goingGuests: guests.filter(g => g.isGoing).length
    }
  }

  private countVegeDiet(guests: GuestData[]): VegeGuestCount{
    return {
      meatGuests: guests.filter(g => !g.isVege && g.isGoing).length,
      vegeGuests: guests.filter(g => g.isVege && g.isGoing).length
    }
  }

  private accommodationText(needAccommodation: boolean){
    return needAccommodation ? 'NOCLEG' : '-'
  }
}
