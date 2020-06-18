import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppContext } from '../app-context';
import { MatDialog } from '@angular/material/dialog';
import { FolderSelectionComponent } from '../folders/folder-selection/folder-selection.component';
import { FolderService } from '../folders/folder.service';

@Component({
  selector: 'apgc-app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.scss']
})
export class AppToolbarComponent implements OnInit {

  @Input() title: string;  
  @Output() menuClicked: EventEmitter<any> = new EventEmitter();

  folderName: string;
  folderYearName: string;
  folderLogo: string;

  constructor(public appContext: AppContext, 
    public dialog: MatDialog, private folderService: FolderService) { }

  ngOnInit(): void { 
    this.getFolderInformation();      
  }

  menuClick(){
    this.menuClicked.emit();
  }

  onOpenFolderClick(){
    const dialogRef = this.dialog.open(FolderSelectionComponent);
    dialogRef.afterClosed().subscribe(result => this.getFolderInformation());
  }

  getFolderInformation(): void {
    this.folderName = undefined;
    this.folderYearName = undefined;
    this.folderLogo = undefined;

    if (this.appContext.folderId) {
      this.folderService.getFolder(this.appContext.folderId).subscribe(
        result => {
          this.folderName = result.folderName;
          this.folderLogo = result.logo;
        });

      if (this.appContext.yearId) {
        this.folderService.getFolderYear(this.appContext.folderId, this.appContext.yearId).subscribe(
          result => this.folderYearName = result.year.toString());
      }
    }
  }

}
