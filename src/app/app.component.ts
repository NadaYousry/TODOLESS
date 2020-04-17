import { Component } from '@angular/core';
import { users } from './modals/users'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title(title: any) {
    throw new Error("Method not implemented.");
  }
  filtering = "";

  
}
