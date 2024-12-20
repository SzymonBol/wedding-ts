import { AfterViewInit, Component, computed, effect, inject, output, signal } from '@angular/core';
import { ROUTE } from '../../shared/routes.enum';
import { MenuItem } from './types/menu.interface';
import { NavigationEnd, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common'
import { toSignal } from '@angular/core/rxjs-interop'
import { menuItemsData } from './menu-items.const';

@Component({
    selector: 'app-menu',
    imports: [MatButtonModule, NgClass],
    templateUrl: './nav-menu.component.html',
    styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent implements AfterViewInit {

  private router = inject(Router);
  routerChange = toSignal(this.router.events);
  protected currentUrl = signal<string>('');
  
  protected selectedItem = computed(() => {
    const change =this.routerChange();
    if(change instanceof NavigationEnd){
      if(change.url.includes(ROUTE.HOME)){
        return ROUTE.HOME;
      } else if(change.url.includes(ROUTE.ADDITIONAL_INFO)){
        return ROUTE.ADDITIONAL_INFO;
      } else if(change.url.includes(ROUTE.INVITE_CONFIRMATION)){
        return ROUTE.INVITE_CONFIRMATION;
      }
    } 
    return '';
  })
  itemClicked = output<void>();

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
