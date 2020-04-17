import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timerFormat'
})
export class TimerFormatPipe implements PipeTransform {

  transform(value: any ,minutes?:number ,secounds?:number): any {
    if(!value){return null}
    return value+':'+minutes+':'+secounds;
  }

}
