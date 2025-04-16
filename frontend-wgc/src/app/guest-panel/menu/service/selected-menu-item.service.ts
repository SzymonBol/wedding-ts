import { effect, inject, Injectable, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { NavigationEnd, NavigationSkipped, Router } from "@angular/router";
import { ROUTE } from "../../../shared/routes.enum";

@Injectable({providedIn: "root"})
export class SelectedItemService{
    selectedItem = signal('');
    private readonly routerChange = toSignal(inject(Router).events);
      
      selectedItemEff = effect(() => {
          const change =this.routerChange();
          if(change instanceof NavigationEnd || change instanceof NavigationSkipped){
            if(change.url.includes(ROUTE.HOME) || change.url === '/'){
              this.selectedItem.set(ROUTE.HOME);
            } else if(change.url.includes(ROUTE.ENTER_CODE) || change.url.includes(ROUTE.INVITE_CONFIRMATION)){
              this.selectedItem.set(ROUTE.ENTER_CODE);
            }
          }
      }, {allowSignalWrites: true});
}
