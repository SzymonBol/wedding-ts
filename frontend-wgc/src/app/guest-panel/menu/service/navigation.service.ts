import { inject, Injectable } from "@angular/core";
import { MenuItem } from "../types/menu.interface";
import { Router } from "@angular/router";
import { ConfirmationDialogService } from "../../../admin-panel/confirmation-dialog/service/confirmation-dialog.service";
import { ConfrimationDialogData } from "../../../types/confirmation-dialog-data.types";
import { LogMessageServce } from "../../../services/log-message.service";

@Injectable({providedIn: 'root'})
export class ChangeNavigationService{
    router = inject(Router);
    confirmationDialogSrv = inject(ConfirmationDialogService);
    logMessage = inject(LogMessageServce);

    navigate(item: MenuItem | string){
        if(typeof item ==='string'){
            this.router.navigateByUrl(item);
            return;
        } 

        if(item.external){
            if(item.externalConfrimation){
                const dialogConfig : ConfrimationDialogData = {
                    header: item.externalConfrimation.header,
                    text: item.externalConfrimation.text,
                    confirmFn: () => {
                        this.logMessage.logMessage({text: 'Redirect to google folder', severity: 'info'})
                        window.location.href = item.targetRoute;
                    },
                    rejectFn: () => {}
                }
                this.confirmationDialogSrv.open(dialogConfig)
            } else {
                window.location.href = item.targetRoute;
            }
            
        } else {
            this.router.navigateByUrl(item.targetRoute);
        }
    }
}