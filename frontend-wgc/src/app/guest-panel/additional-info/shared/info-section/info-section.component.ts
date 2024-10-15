import { Component, input } from '@angular/core';

@Component({
  selector: 'app-info-section',
  standalone: true,
  imports: [],
  templateUrl: './info-section.component.html',
  styleUrl: './info-section.component.scss'
})
export class InfoSectionComponent {
  sectionName = input<string>('');
  sectionDescription = input<string>('');
  sectionId= input<string>('');
}
