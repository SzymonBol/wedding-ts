import { inject, Injectable } from "@angular/core";
import { ConfrimationDialogData } from "../../../types/confirmation-dialog-data.types";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../confirmation-dialog.component";
import { firstValueFrom } from "rxjs";
import { Router } from "@angular/router";
import { HttpAuthService } from "../../../services/auth.service";
import { AuthDataStore } from "../../../shared/store/auth.store";
import { ROUTE } from "../../../shared/routes.enum";

@Injectable({providedIn: 'root'})
export class ConfirmationDialogService {
    readonly dialogServ = inject(MatDialog);
    private router = inject(Router);
    readonly authService = inject(HttpAuthService);
    readonly authStore = inject(AuthDataStore);

    open(config: ConfrimationDialogData){
        this.dialogServ.open(ConfirmationDialogComponent, { data : {
            header: config.header,
            text: config.text,
            rejectFn: config.rejectFn,
            confirmFn: config.confirmFn
        }})
    }

    logout(){
        const config : ConfrimationDialogData = {
            header: 'Czy na pewno chcesz się wylogować?',
            text: 'Wylogowanie spowoduje zakończenie aktualnej sesji oraz przeniesienie na stronę główną. Aby ponownie dostać się na stronę zarządznia niezbędne będzie ponowne logowanie',
            confirmFn: async () => {
              await firstValueFrom(this.authService.logout());
              this.router.navigateByUrl(ROUTE.HOME);
              this.authStore.updateLoginStatus({isFine: false, user: null});
            },
            rejectFn: () => {}
          }
          this.open(config);
    }
}