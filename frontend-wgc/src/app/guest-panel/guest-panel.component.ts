import { AfterViewInit, Component, inject, NgZone } from '@angular/core';
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
export class GuestPanelComponent implements AfterViewInit {
  protected store = inject(GuestDataStore);
  protected isLoadingSig = this.store.isLoading;
  private zone =inject(NgZone);

  ngAfterViewInit(): void {
    const appContentRef = document.getElementById('application-content');
    const applicationHeader = document.getElementById('application-header');

    const observer = new ResizeObserver(entries => {
      this.zone.run(() => {
        if(appContentRef){
          appContentRef.style.marginTop = `${entries[0].contentRect.height +24}px`
        }
      });
    });
   
    if(applicationHeader){
      observer.observe(applicationHeader);
    }
  }

  toggleDrawer(drawer : MatDrawer) {
    drawer.toggle();
  }
}
