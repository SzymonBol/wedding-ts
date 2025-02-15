import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toHours',
  standalone: true
})
export class ToHoursPipe implements PipeTransform {

  transform(value: string): unknown {
    const date = new Date(value);

    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${hours}:${minutes}`;
  }

}
