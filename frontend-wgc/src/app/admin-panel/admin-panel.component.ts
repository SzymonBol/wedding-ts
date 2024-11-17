import { Component } from '@angular/core';
import { TopSectionComponent } from "./top-section/top-section.component";
import { AdminTableComponent } from "./admin-table/admin-table.component";
import { MatTabsModule } from '@angular/material/tabs';
import { DietTableComponent } from "./diet-table/diet-table.component";
import { GoingGuestsTableComponent } from "./going-guests-table/going-guests-table.component";


@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [TopSectionComponent, AdminTableComponent, MatTabsModule, DietTableComponent, GoingGuestsTableComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent{

}
