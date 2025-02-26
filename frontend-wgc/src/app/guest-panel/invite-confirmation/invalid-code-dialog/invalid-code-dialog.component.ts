import { NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, computed, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-invalid-code-dialog',
  standalone: true,
  imports: [
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
      MatButtonModule,
      NgTemplateOutlet
  ],
  templateUrl: './invalid-code-dialog.component.html',
  styleUrl: './invalid-code-dialog.component.scss'
})
export class InvalidCodeDialogComponent implements AfterViewInit{
  readonly data = inject(MAT_DIALOG_DATA);
  counter = signal(10);
  interval: any;
  disableButton = false;
  env = environment;

  @ViewChild('normal') normalTemplate! : TemplateRef<any>;
  @ViewChild('more') moreTemplate! : TemplateRef<any>;
  @ViewChild('more4') more4Template! : TemplateRef<any>;
  @ViewChild('more5') more5Template! : TemplateRef<any>;
  @ViewChild('police') policeTemplate! : TemplateRef<any>;

  selectedTemplate! : TemplateRef<any>;

  header = computed(() => {
    const countOfFailedCodesProvided = this.data();
    switch(countOfFailedCodesProvided){
      case 1 : return 'Niepoprawny kod';
      case 2 : return 'Ups.. coś poszło nie tak';
      case 3 : return 'Sprawdź dokładnie wprowadzone znaki';
      case 4 : return 'Nie spiesz się!';
      case 5 : return 'Spokojnie, nie denerwuj się, weźmiemy zaproszenie i będziemy potwierdzać!';
      default : return 'Żarty się skończyły. Dzowń na telefon.'
    }
  })

  ngAfterViewInit(): void {
    setTimeout(() => {
      switch(this.data()){
        case 1 : {this.selectedTemplate = this.normalTemplate; break;}
        case 2 : {this.selectedTemplate = this.normalTemplate; break;}
        case 3 : {this.selectedTemplate = this.moreTemplate; break;}
        case 4 : {this.selectedTemplate = this.more4Template; this.startTimer(); break;}
        case 5 : {this.selectedTemplate = this.more5Template; break;}
        default : {this.selectedTemplate = this.policeTemplate; this.disableButton = true; break;}
      }
    })
  }

  startTimer(){
    this.disableButton = true;
    this.interval = setInterval(() => {
      this.counter.update(d => d-1);
      if(this.counter() <= 0){
        this.disableButton= false;
        clearInterval(this.interval);
      }
    },1000)
  }
}
