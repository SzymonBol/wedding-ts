import { Component } from '@angular/core';
import { InfoMapComponent } from "../../shared/components/info-map/info-map.component";
import { InfoSectionComponent } from "./shared/info-section/info-section.component";
import { PartyScheduleComponent } from "./party-schedule/party-schedule.component";

@Component({
    selector: 'app-additional-info',
    templateUrl: './additional-info.component.html',
    styleUrl: './additional-info.component.scss',
    imports: [
        InfoMapComponent,
        InfoSectionComponent,
        PartyScheduleComponent
    ]
})
export class AdditionalInfoComponent {
  sections = [
    {
      id: 'rozklad-stolow-id',
      name: 'Rozkład stołów'
    },
    {
      id: 'harmonogram-id',
      name: 'Harmonogram'
    },
    {
      id: 'dojazd-id',
      name: 'Dojazd'
    },
  ]

  moveToSection(id: string){
    const elem = document.getElementById(id);
    if(elem)
      elem?.scrollIntoView({ behavior: 'smooth' });
  }
}
