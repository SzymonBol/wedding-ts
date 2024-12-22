import { Component } from '@angular/core';
import { TimeLeftComponent } from "./time-left/time-left.component";
import { CaruselComponent } from './carusel/carusel.component';
import { InvitationBaseInfoComponent } from './invitation-base-info/invitation-base-info.component';

@Component({
    selector: 'app-home',
    imports: [TimeLeftComponent, CaruselComponent, InvitationBaseInfoComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

}
