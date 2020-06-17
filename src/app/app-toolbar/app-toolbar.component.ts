import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'apgc-app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.scss']
})
export class AppToolbarComponent implements OnInit {

  @Input() title: string;  
  @Output() menuClicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {       
  }

  menuClick(){
    this.menuClicked.emit();
  }

}
