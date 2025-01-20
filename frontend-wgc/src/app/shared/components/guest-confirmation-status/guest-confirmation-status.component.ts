import { Component, computed, effect, forwardRef, input, model, signal } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

const NG_GUEST_GOING_STATUS_VALUE_ACCESSOR = {       
  provide : NG_VALUE_ACCESSOR, 
  useExisting: forwardRef(() => GuestConfirmationStatusComponent),
  multi: true     
} 

@Component({
  selector: 'app-guest-confirmation-status',
  standalone: true,
  imports: [MatIconModule, MatButtonToggleModule, FormsModule],
  templateUrl: './guest-confirmation-status.component.html',
  styleUrl: './guest-confirmation-status.component.scss',
  providers : [NG_GUEST_GOING_STATUS_VALUE_ACCESSOR]
})
export class GuestConfirmationStatusComponent implements ControlValueAccessor{
  editMode = input<boolean>(true);
  goingStatus = model<boolean>(true);

  status = computed(()=> {
    return this.goingStatus() ? 'yes' : 'no';
  })

  onChange: any = () => {}
  onTouch: any = () => {}

  writeValue(val: boolean): void {
    this.goingStatus.set(val);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }

  valueChanged($event: string){
    this.writeValue($event === 'yes' ? true : false);
    this.onChange(this.goingStatus());
  }
}
