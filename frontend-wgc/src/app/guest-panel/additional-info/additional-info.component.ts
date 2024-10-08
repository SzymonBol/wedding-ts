import { Component } from '@angular/core';
import { GoogleMapsModule, MapMarker } from "@angular/google-maps";

@Component({
  selector: 'app-additional-info',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './additional-info.component.html',
  styleUrl: './additional-info.component.scss'
})
export class AdditionalInfoComponent {
  options: google.maps.MapOptions = {
    mapId: "DEMO_MAP_ID",
    center: { lat: 49.55224231685368, lng: 20.37067956832379 },
    zoom: 12,
  };

  marker = { lat: 49.55224231685368, lng: 20.37067956832379 }
}
