import { Component } from '@angular/core';
import { TimeLeftComponent } from "./time-left/time-left.component";
import { InvitationBaseInfoComponent } from './invitation-base-info/invitation-base-info.component';
import { PlacesComponent } from "./places/places.component";
import { PartyScheduleComponent } from "./party-schedule/party-schedule.component";
import { TSGalleryComponent } from "./gallery/gallery.component";
import { QuotationsComponent } from "./quotations/quotations.component";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [TimeLeftComponent, InvitationBaseInfoComponent, PlacesComponent, PartyScheduleComponent, TSGalleryComponent, QuotationsComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

}
