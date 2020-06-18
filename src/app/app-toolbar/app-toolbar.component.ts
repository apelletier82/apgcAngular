import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppContext } from '../app-context';
import { MatDialog } from '@angular/material/dialog';
import { FolderSelectionComponent } from '../folders/folder-selection/folder-selection.component';

@Component({
  selector: 'apgc-app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.scss']
})
export class AppToolbarComponent implements OnInit {

  @Input() title: string;  
  @Output() menuClicked: EventEmitter<any> = new EventEmitter();

  constructor(public appContext: AppContext, 
    public dialog: MatDialog) { }

  ngOnInit(): void {       
  }

  menuClick(){
    this.menuClicked.emit();
  }

  onOpenFolderClick(){
    const dialogRef = this.dialog.open(FolderSelectionComponent, { width: '50%'});
    //, {
    //  width:'600px',
    //  height:'600px'
    //});    
  }

}
