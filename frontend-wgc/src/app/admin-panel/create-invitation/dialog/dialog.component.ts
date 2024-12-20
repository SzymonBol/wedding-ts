import { AfterViewInit, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { GuestAdminService } from '../../../services/guest-admin.service';
import { InvitationRequest } from '../../../types/admin-panel.types';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminStore } from '../../../shared/store/admin.store';

@Component({
    selector: 'app-create-invitation-dialog',
    imports: [MatIconModule, MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule
    ],
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.scss'
})
export class CreateInvitationDialogComponent implements AfterViewInit{
  readonly dialogRef = inject(MatDialogRef<CreateInvitationDialogComponent>);
  readonly formBuilder = inject(FormBuilder);
  readonly adminService = inject(GuestAdminService);
  private _snackBar = inject(MatSnackBar);
  private adminStore = inject(AdminStore);
  
  form = this.formBuilder.group({
    guests: this.formBuilder.array([]),
    additionalPerson: [true]
  })

  ngAfterViewInit(): void {
    this.addGuest();
  }

  closeDialog(){
    this.dialogRef.close();
  }

  async submit(){
    if(this.guests.controls.length >1 && this.form.get('additionalPerson')){
      this.form.get('additionalPerson')?.setValue(false);
    }

    const value: InvitationRequest = {
      guests: this.guests.value,
      additionalPerson: this.form.get('additionalPerson')?.value ?? false
    }

    await firstValueFrom(this.adminService.addInvitation(value));
    this.closeDialog();
    this._snackBar.open('Dodano nowe zaproszenie!', 'OK');
    const guestes =  await firstValueFrom(this.adminService.getGuests());
    this.adminStore.setStoreState(guestes);
  }

  addGuest(){
    const guestForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required]
    });

    this.guests.push(guestForm);
  }

  deleteGuest(guestIndex: number) {
    this.guests.removeAt(guestIndex);
}

  get guests() {
    return this.form.controls["guests"] as FormArray;
  }
}
