import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args: any): unknown {
    const filterd = [];
    if(value.length === 0 || args === ""){
      return value  
    }
    for(const item of value){
      if(item.name.startsWith(args.toLowerCase()) || item.name.includes(args.toLowerCase())){
        filterd.push(item)
        console.log(item.role)
      }
    }
    return filterd;
  }

}
