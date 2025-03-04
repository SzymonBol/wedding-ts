import { inject, Injectable } from "@angular/core";
import { MenuItem } from "../types/menu.interface";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class ChangeNavigationService{
    router = inject(Router);

    navigate(item: MenuItem | string){
        if(typeof item ==='string'){
            this.router.navigateByUrl(item);
            return;
        } 

        if(item.external){
            window.location.href = item.targetRoute;
        } else {
            this.router.navigateByUrl(item.targetRoute);
        }
    }
}