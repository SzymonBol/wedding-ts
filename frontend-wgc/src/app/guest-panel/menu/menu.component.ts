import { AfterViewInit, Component, inject, output, signal } from '@angular/core';
import { ROUTE } from '../../shared/routes.enum';
import { MenuItem } from './types/menu.interface';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { NgClass } from '@angular/common'

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButtonModule, NgClass],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements AfterViewInit {

  private router = inject(Router);
  protected currentUrl = signal<string>('');
  itemClicked = output<void>();

  protected menuRoutes = [
    ROUTE.HOME,
    ROUTE.ADDITIONAL_INFO,
    ROUTE.INVITE_CONFIRMATION
  ]

  menuItems : MenuItem[] = [ 
    {
      targetRoute: ROUTE.HOME,
      label: 'Strona główna',
      isActive: false,
    },
    {
      targetRoute: ROUTE.ADDITIONAL_INFO,
      label: 'Informacje',
      isActive: false,
    },
    {
      targetRoute: ROUTE.INVITE_CONFIRMATION,
      label: 'Potwierdź zaproszenie',
      isActive: false,
    }
  ];

  ngAfterViewInit(): void {
    this.currentUrl.set(this.router.url);
  }

  navigate(route: string) {
    this.itemClicked.emit();
    this.currentUrl.set(route);
    this.router.navigateByUrl(route);
  }
}
