import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
    selector: 'app-going-guests-count',
    imports: [NgClass],
    templateUrl: './going-guests-count.component.html',
    styleUrl: './going-guests-count.component.scss'
})
export class GoingGuestsCountComponent {
  allGuestsCount = input.required<number>();
  goingGuestsCount = input.required<number>();
}
