import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GuestDataStore } from './shared/store/guest-panel.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected isLoadingSig = inject(GuestDataStore).isLoading;
}
