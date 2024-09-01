import { Component, forwardRef, input, model } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { IsGoingType } from '../../../types/guests-store-data.types';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const NG_GUEST_GOING_STATUS_VALUE_ACCESSOR = {       
  provide : NG_VALUE_ACCESSOR, 
  useExisting: forwardRef(() => GuestConfirmationStatusComponent),
  multi: true     
} 

@Component({
  selector: 'app-guest-confirmation-status',
  standalone: true,
  imports: [MatIconModule, NgClass],
  templateUrl: './guest-confirmation-status.component.html',
  styleUrl: './guest-confirmation-status.component.scss',
  providers : [NG_GUEST_GOING_STATUS_VALUE_ACCESSOR]
})
export class GuestConfirmationStatusComponent implements ControlValueAccessor{
  editMode = input<boolean>(true);
  goingStatus = model<IsGoingType>('maybe');

  protected toggleStatus(){
    if(!this.editMode()) return;

    switch(this.goingStatus()){
      case 'maybe' : {
        this.writeValue('yes');
        break;
      }
      case 'yes' : {
        this.writeValue('no');
        break;
      }
      case 'no' : {
        this.writeValue('maybe');
        break;
      }
    }
    this.onChange(this.goingStatus());
  }

  onChange: any = () => {}
  onTouch: any = () => {}

  writeValue(val: IsGoingType): void {
    this.goingStatus.set(val);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }
}
