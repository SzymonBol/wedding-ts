import { Component, inject } from '@angular/core';
import { menuItemsData } from '../menu-items.const';
import { MenuItem } from '../types/menu.interface';
import { MatIcon } from '@angular/material/icon';
import { AuthDataStore } from '../../../shared/store/auth.store';
import { MatButtonModule } from '@angular/material/button';
import { ROUTE } from '../../../shared/routes.enum';
import { NgClass } from '@angular/common';
import { SelectedItemService } from '../service/selected-menu-item.service';
import { ChangeNavigationService } from '../service/navigation.service';

@Component({
  selector: 'app-desktop-menu',
  standalone: true,
  imports: [MatIcon, MatButtonModule, NgClass],
  templateUrl: './desktop-menu.component.html',
  styleUrl: './desktop-menu.component.scss'
})
export class DesktopMenuComponent {
  menuItems : MenuItem[] = menuItemsData;
  loggedUser = inject(AuthDataStore).loggedUser;
  ROUTE=ROUTE;
  selectedItem = inject(SelectedItemService).selectedItem;
  navigationSrv = inject(ChangeNavigationService);

  navigate(menuItem: MenuItem | string) {
    this.navigationSrv.navigate(menuItem);
  }
}
