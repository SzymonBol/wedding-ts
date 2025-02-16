import { AfterViewInit, Component, computed, effect, inject, output, signal } from '@angular/core';
import { ROUTE } from '../../shared/routes.enum';
import { MenuItem } from './types/menu.interface';
import { NavigationEnd, NavigationSkipped, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common'
import { toSignal } from '@angular/core/rxjs-interop'
import { menuItemsData } from './menu-items.const';
import { SelectedItemService } from './service/selected-menu-item.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButtonModule, NgClass],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent implements AfterViewInit {

  private router = inject(Router);
  protected currentUrl = signal<string>('');
  itemClicked = output<void>();
  selectedItem = inject(SelectedItemService).selectedItem;
  
  menuItems : MenuItem[] = menuItemsData;

  ngAfterViewInit(): void {
    this.currentUrl.set(this.router.url);
  }

  navigate(route: string) {
    this.itemClicked.emit();
    this.currentUrl.set(route);
    this.router.navigateByUrl(route);
  }
}
