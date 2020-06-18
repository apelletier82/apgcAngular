import { Component} from '@angular/core';
import { AppContext } from './app-context';

@Component({
  selector: 'apgc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'apgc';
  constructor(public appContext: AppContext){
  }    
}
