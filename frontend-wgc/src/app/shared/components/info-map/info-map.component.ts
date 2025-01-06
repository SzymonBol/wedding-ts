import { Component, computed, inject, input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { DomSanitizer } from "@angular/platform-browser";


@Component({
    selector: 'app-info-map',
    imports: [MatIconModule],
    templateUrl: './info-map.component.html',
    styleUrl: './info-map.component.scss'
})
export class InfoMapComponent{
  public place = input<string>('');
  public name = input<string>('');
  public firstLineText = input<string>('');
  public secondLinetext = input<string>('');
  public iconName= input<string>('');

  private domSanitizer = inject(DomSanitizer);

  public saveUrl = computed(()=> {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(`https://www.google.com/maps/embed/v1/place?key=AIzaSyCyvXhdR3kqW-AiVWGGVBj92fXhlPrva8k&q=${this.place()}`);
  })
}
