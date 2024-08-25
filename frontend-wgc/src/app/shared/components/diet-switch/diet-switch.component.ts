import { Component, signal } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-diet-switch',
  standalone: true,
  imports: [MatSlideToggleModule, MatIconModule, NgClass],
  templateUrl: './diet-switch.component.html',
  styleUrl: './diet-switch.component.scss'
})
export class DietSwitchComponent {

  isVege =signal<boolean>(false);

  changeValue() {
    this.isVege.update(val => !val);
  }

}
