import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { TopSectionComponent } from "./top-section/top-section.component";
import { AdminTableComponent } from "./admin-table/admin-table.component";
import { MatTabsModule } from '@angular/material/tabs';
import { DietTableComponent } from "./diet-table/diet-table.component";
import { GoingGuestsTableComponent } from "./going-guests-table/going-guests-table.component";
import { GuestSummaryComponent } from "./guest-summary/guest-summary.component";
import { firstValueFrom } from 'rxjs';
import { GuestAdminService } from '../services/guest-admin.service';
import { AdminStore } from '../shared/store/admin.store';
import { CreateInvitationComponent } from "./create-invitation/create-invitation.component";


@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [TopSectionComponent, AdminTableComponent, MatTabsModule, DietTableComponent, GoingGuestsTableComponent, GuestSummaryComponent, CreateInvitationComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPanelComponent implements OnInit{
  private guestsService = inject(GuestAdminService);
  private adminStore = inject(AdminStore);

  async ngOnInit(){
    const guestes =  await firstValueFrom(this.guestsService.getGuests());
    this.adminStore.setStoreState(guestes);
  }
}
