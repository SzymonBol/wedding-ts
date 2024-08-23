import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MenuComponent } from "./menu/menu.component";


@Component({
  selector: 'app-guest-panel',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MenuComponent
],
  templateUrl: './guest-panel.component.html',
  styleUrl: './guest-panel.component.scss'
})
export class GuestPanelComponent {

toggleDrawer(drawer : MatDrawer) {
  drawer.toggle();
}

}
