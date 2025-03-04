import { Component, inject, output } from '@angular/core';
import { MenuItem } from './types/menu.interface';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common'
import { menuItemsData } from './menu-items.const';
import { SelectedItemService } from './service/selected-menu-item.service';
import { ChangeNavigationService } from './service/navigation.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButtonModule, NgClass],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent{
  private navigationSrv = inject(ChangeNavigationService);
  itemClicked = output<void>();
  selectedItem = inject(SelectedItemService).selectedItem;
  
  menuItems : MenuItem[] = menuItemsData;

  navigate(route: MenuItem | string) {
    this.itemClicked.emit();
    this.navigationSrv.navigate(route);
  }
}
