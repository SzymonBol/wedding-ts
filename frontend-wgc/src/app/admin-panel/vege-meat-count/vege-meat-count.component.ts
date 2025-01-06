import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-vege-meat-count',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './vege-meat-count.component.html',
  styleUrl: './vege-meat-count.component.scss'
})
export class VegeMeatCountComponent {
  meatCount = input.required<number>();
  vegeCount = input.required<number>();
  confirmed = input<boolean>();
}
