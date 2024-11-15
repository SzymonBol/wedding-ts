import { Component } from '@angular/core';
import { TopSectionComponent } from "./top-section/top-section.component";
import { AdminTableComponent } from "./admin-table/admin-table.component";


@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [TopSectionComponent, AdminTableComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent{

}
