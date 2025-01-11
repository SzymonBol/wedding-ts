import { Component, computed, inject } from '@angular/core';
import { menuItemsData } from '../menu-items.const';
import { MenuItem } from '../types/menu.interface';
import { NavigationEnd, Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { AuthDataStore } from '../../../shared/store/auth.store';
import { MatButtonModule } from '@angular/material/button';
import { ROUTE } from '../../../shared/routes.enum';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-desktop-menu',
  standalone: true,
  imports: [MatIcon, MatButtonModule, NgClass],
  templateUrl: './desktop-menu.component.html',
  styleUrl: './desktop-menu.component.scss'
})
export class DesktopMenuComponent {
  menuItems : MenuItem[] = menuItemsData;
  router = inject(Router);
  loggedUser = inject(AuthDataStore).loggedUser;
  ROUTE=ROUTE;

  routerChange= toSignal(this.router.events);

  protected selectedItem = computed(() => {
    const change =this.routerChange();
    if(change instanceof NavigationEnd){
      if(change.url.includes(ROUTE.HOME)){
        return ROUTE.HOME;
      } else if(change.url.includes(ROUTE.INVITE_CONFIRMATION)){
        return ROUTE.INVITE_CONFIRMATION;
      }
    } 
    return '';
  })

  navigate(route: string) {
    this.router.navigateByUrl(route);
  }
}
