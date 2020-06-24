import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppContext } from '../app-context';
import { MatDialog } from '@angular/material/dialog';
import { FolderSelectionComponent } from '../folders/folder-selection/folder-selection.component';
import { FolderService } from '../folders/folder.service';
import { FolderSelectionData } from '../folders/folder-selection/folder-selection-data';

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

  constructor(
    public appContext: AppContext,
    public dialog: MatDialog,
    private _folderService: FolderService) {
  }

  ngOnInit(): void {
    this.updateFolderInformation(this.appContext.folderId, this.appContext.yearId);
  }

  menuClick() {
    this.menuClicked.emit();
  }

  onOpenFolderClick() {
    const dialogRef = this.dialog.open(FolderSelectionComponent, {
      data: { folderId: this.appContext.folderId, yearId: this.appContext.yearId }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const fsd: FolderSelectionData = (result as FolderSelectionData);
        this.updateFolderInformation(fsd.folderId, fsd.yearId);
      }
    });
  }

  updateFolderInformation(folderId: number, yearId: number): void {
    this.appContext.folderId = folderId;
    this.appContext.yearId = yearId;
    this.folderName = undefined;
    this.folderYearName = undefined;
    this.folderLogo = undefined;

    if (this.appContext.folderId) {
      this._folderService.getFolder(this.appContext.folderId).subscribe(result => {
        this.folderName = result.folderName;
        this.folderLogo = result.logo;

        if (this.appContext.yearId) {
          const fldYears = result.years.filter(y => y.yearId === this.appContext.yearId);
          if (fldYears && fldYears.length === 1) {
            this.folderYearName = fldYears[0].year.toString();
          }
        }
      });
    }
  }
}
