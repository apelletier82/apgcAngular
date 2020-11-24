import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
    selector: 'apgc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'apgc';
    constructor(public appService: AppService) { }
}
