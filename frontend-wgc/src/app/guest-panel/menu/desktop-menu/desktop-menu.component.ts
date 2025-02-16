import { Component, computed, effect, inject, signal } from '@angular/core';
import { menuItemsData } from '../menu-items.const';
import { MenuItem } from '../types/menu.interface';
import { NavigationEnd, NavigationSkipped, Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { AuthDataStore } from '../../../shared/store/auth.store';
import { MatButtonModule } from '@angular/material/button';
import { ROUTE } from '../../../shared/routes.enum';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';
import { SelectedItemService } from '../service/selected-menu-item.service';

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
  selectedItem = inject(SelectedItemService).selectedItem;

  navigate(route: string) {
    this.router.navigateByUrl(route);
  }
}
