import { Component, forwardRef, input, model, signal } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const NG_DIET_COMPONENT_VALUE_ACCESSOR = {       
  provide : NG_VALUE_ACCESSOR, 
  useExisting: forwardRef(() => DietSwitchComponent),
  multi: true     
} 

@Component({
  selector: 'app-diet-switch',
  standalone: true,
  imports: [MatSlideToggleModule, MatIconModule, NgClass],
  templateUrl: './diet-switch.component.html',
  styleUrl: './diet-switch.component.scss',
  providers : [NG_DIET_COMPONENT_VALUE_ACCESSOR]
})
export class DietSwitchComponent implements ControlValueAccessor{
  isVege = signal<boolean>(false);
  editMode = input<boolean>(true);

  onChange: any = () => {}
  onTouch: any = () => {}

  writeValue(val: boolean): void {
    this.isVege.set(val)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }

  changeValue() {
    this.writeValue(!this.isVege());
    this.onChange(this.isVege());
  }
}
