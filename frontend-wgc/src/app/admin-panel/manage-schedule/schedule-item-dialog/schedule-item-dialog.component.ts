import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { environment } from '../../../../environments/environment';
import { PartyScheduleItem } from '../../../guest-panel/home/party-schedule/types/party-schedule.type';
import { ScheduleHttpSrv } from '../../../services/schedule-http.service';
import { firstValueFrom } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-schedule-item-dialog',
  standalone: true,
  imports: [    
    MatIconModule, 
    MatButtonModule,    
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule
  ],
  templateUrl: './schedule-item-dialog.component.html',
  styleUrl: './schedule-item-dialog.component.scss'
})
export class ScheduleItemDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ScheduleItemDialogComponent>);
  readonly formBuilder = inject(FormBuilder);
  readonly scheduleService = inject(ScheduleHttpSrv);
  protected id = signal<string | undefined>(undefined);
  protected addNext = false;

  text = computed(() => {
    if(this.id()){
      return {
        header: '',
        desciption: '',
        confirmButton: ''
      }
    } else {
      return {
        header: 'Dodaj punkt harmonogramu',
        desciption: 'Uzupełnij formularz o poprawne dane i zatwierdź przyciskiem.',
        confirmButton: 'Dodaj'
      }
    }
  })

  form = this.formBuilder.group({
    icon: ['', Validators.required],
    title: ['', Validators.required],
    description: [''],
    date: [new Date(environment.weddingDate), Validators.required],
    time: ['', Validators.required]
  })

  closeDialog(){
    this.dialogRef.close();
  }

  async submit(){
    const {icon, title, description, date, time} = this.form.value;
    if(!icon || !title || !date || !time) return;

    let [hour, minutes] = time.split(':');
    if(!(hour && minutes && /^\d{2}$/.test(hour) && /^\d{2}$/.test(minutes))) return;

    date.setHours(+hour);
    date.setMinutes(+minutes);


    const item: any = {
      title,
      icon,
      description,
      time: date.toISOString()
    }

    await firstValueFrom(this.scheduleService.createSchedulePoint(item));

    this.scheduleService.fetchSchedule();

    if(this.addNext)
      this.form.reset();
    else
      this.dialogRef.close();
  }
}
