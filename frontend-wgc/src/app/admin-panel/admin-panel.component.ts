import { Component, inject } from '@angular/core';
import { HttpAuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {
  private authService = inject(HttpAuthService);

  addUser(){
    this.authService.checkSession().subscribe();
  }
}
