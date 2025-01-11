import { Component } from '@angular/core';
import { TimeLeftComponent } from "./time-left/time-left.component";
import { InvitationBaseInfoComponent } from './invitation-base-info/invitation-base-info.component';
import { PlacesComponent } from "./places/places.component";
import { PartyScheduleComponent } from "../../shared/components/party-schedule/party-schedule.component";
import { TSGalleryComponent } from "./gallery/gallery.component";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [TimeLeftComponent, InvitationBaseInfoComponent, PlacesComponent, PartyScheduleComponent, TSGalleryComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

}
