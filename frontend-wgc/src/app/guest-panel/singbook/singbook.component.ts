import { Component, computed, inject, signal } from '@angular/core';
import {AsyncPipe, NgClass} from '@angular/common';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Singbook } from './types/singbook.type';
import { map, Observable, startWith } from 'rxjs';
import { songs } from './types/songs.const';
import { MatIconModule } from '@angular/material/icon';
import { LogMessageServce } from '../../services/log-message.service';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';


@Component({
  selector: 'app-singbook',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    NgClass
  ],
  templateUrl: './singbook.component.html',
  styleUrl: './singbook.component.scss'
})
export class SingbookComponent {

  songControl = new FormControl<string | Singbook>('');
  options: Singbook[] = songs;
  filteredOptions: Observable<Singbook[]> | undefined;
  readonly logSrv = inject(LogMessageServce);
  readonly selectedSongIndex = signal(0);
  readonly panelOpenState = signal(false);
  readonly selectedSong = computed(() => {
    const idx = this.selectedSongIndex();
    if(idx < 0 )
      return this.options[0]
    else if( idx > this.options.length)
      return this.options[this.options.length -1 ]
    else 
      return this.options[this.selectedSongIndex()];
  })

  ngOnInit() {
    this.logSrv.logMessage({text: 'Open songbook', severity: "info"});
    this.filteredOptions = this.songControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const title = typeof value === 'string' ? value : value?.title;
        return title ? this._filter(title as string) : this.options.slice();
      }),
    );
  }

  displayFn(singbook: Singbook): string {
    return singbook && singbook.title ? singbook.title : '';
  }

  onSelect($event: MatAutocompleteSelectedEvent) {
    const idx = this.options.findIndex(o => o.title === $event.option.value.title);
    this.selectedSongIndex.set(idx);
  }

  prev(){
    if(this.selectedSongIndex() >= 1)
      this.selectedSongIndex.update(val => val -1);
  }

  next(){
    if(this.selectedSongIndex() < this.options.length)
      this.selectedSongIndex.update(val => val + 1);
  }

  selectSong(index: number){
    this.selectedSongIndex.set(index);
    this.panelOpenState.set(false);
  }

  clearField() {
    this.songControl.setValue('');
  }

  private _filter(title: string): Singbook[] {
    const filterValue = title.toLowerCase();

    return this.options.filter(option => option.title.toLowerCase().includes(filterValue));
  }
}
