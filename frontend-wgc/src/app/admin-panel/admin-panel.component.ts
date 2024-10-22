import { Component, inject } from '@angular/core';
import { HttpAuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {
  private authService = inject(HttpAuthService);
  private cookieService = inject(CookieService);

  addUser(){
    this.authService.test().subscribe();
  }
}
