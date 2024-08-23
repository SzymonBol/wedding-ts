import { Component, inject } from '@angular/core';
import { ROUTE } from '../../shared/routes.enum';
import { MenuItem } from './types/menu.interface';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  private router = inject(Router);

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

  navigate(route: string) {
    this.router.navigateByUrl(route)
  }
}
