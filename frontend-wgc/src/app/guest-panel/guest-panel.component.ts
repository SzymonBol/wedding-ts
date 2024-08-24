import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MenuComponent } from "./menu/menu.component";
import { GuestDataStore } from '../shared/store/guest-panel.store';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-guest-panel',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MenuComponent,
    MatProgressSpinnerModule
],
  templateUrl: './guest-panel.component.html',
  styleUrl: './guest-panel.component.scss'
})
export class GuestPanelComponent {
  protected store = inject(GuestDataStore);
  isLoadingSig = this.store.isLoading;

toggleDrawer(drawer : MatDrawer) {
  drawer.toggle();
}

}
