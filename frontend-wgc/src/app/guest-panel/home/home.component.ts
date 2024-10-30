import { Component } from '@angular/core';
import { TimeLeftComponent } from "./time-left/time-left.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TimeLeftComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
