import { AfterViewInit, Component, HostListener, inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { NavMenuComponent } from "./menu/nav-menu.component";
import { GuestDataStore } from '../shared/store/guest-panel.store';
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
  private zone =inject(NgZone);
  private router = inject(Router);
  protected envitoment = environment;
  private authService = inject(HttpAuthService);

  @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;

  ngOnInit(): void {
    this.store.loadingData();
  }

  async ngAfterViewInit(): Promise<void> {
    const appContentRef = document.getElementById('application-content');
    const applicationHeader = document.getElementById('application-header');
    const draw = document.getElementById('mat-menu-drawer');
    if(draw){
      draw.style.visibility = 'hidden';
      setTimeout(() => {
        draw.style.display = 'visible';
      })
    }

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

  toggleDrawer() {
    this.drawer.toggle();
  }

  navigateToAdminPanel(){
    this.router.navigateByUrl(ROUTE.ADMIN_LOGIN);
  }

  logout(){
    this.confirmationDialogService.logout();
  }
}
