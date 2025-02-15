import { AfterViewInit, Component, inject, NgZone, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { NavMenuComponent } from "./menu/nav-menu.component";
import { GuestDataStore } from '../shared/store/guest-panel.store';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { environment } from '../../environments/environment';
import { ROUTE } from '../shared/routes.enum';
import { AuthDataStore } from '../shared/store/auth.store';
import { ConfirmationDialogService } from '../admin-panel/confirmation-dialog/service/confirmation-dialog.service';
import { DesktopMenuComponent } from "./menu/desktop-menu/desktop-menu.component";
import { HttpAuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-guest-panel',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    NavMenuComponent,
    MatProgressSpinnerModule,
    DesktopMenuComponent
],
  templateUrl: './guest-panel.component.html',
  styleUrl: './guest-panel.component.scss'
})
export class GuestPanelComponent implements OnInit, AfterViewInit {
  protected store = inject(GuestDataStore);
  private authStore = inject(AuthDataStore);
  protected user = this.authStore.loggedUser;
  readonly confirmationDialogService = inject(ConfirmationDialogService);
  protected isLoadingSig = this.store.isLoading;
  private zone =inject(NgZone);
  private router = inject(Router);
  protected envitoment = environment;
  private authService = inject(HttpAuthService);

  ngOnInit(): void {
    this.store.loadingData();
  }

  async ngAfterViewInit(): Promise<void> {
    const appContentRef = document.getElementById('application-content');
    const applicationHeader = document.getElementById('application-header');

        try{
          const result = await firstValueFrom(this.authService.checkSession());
          this.authStore.updateLoginStatus(result);
          this.store.finishLoading();
        } catch(error){
          this.store.finishLoading();
          console.warn('There is no existing session');
        }

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

  navigateToAdminPanel(){
    this.router.navigateByUrl(ROUTE.ADMIN_LOGIN);
  }

  logout(){
    this.confirmationDialogService.logout();
  }
}
