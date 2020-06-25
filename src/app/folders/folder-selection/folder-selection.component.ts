import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { FolderService } from '../folder.service';
import { Folder } from '../folder';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FolderYear } from '../folder-year';
import { FolderSelectionData } from './folder-selection-data';
import { Observable, of, from } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'apgc-folder-selection',
  templateUrl: './folder-selection.component.html',
  styleUrls: ['./folder-selection.component.scss']
})
export class FolderSelectionComponent implements OnInit {
  private _originalFolders: Folder[];
  private _selectedFolderOption: string;

  folders: Folder[];
  selectedFolderYears$: Observable<FolderYear[]>;

  get selectedFolderOption(): string {
    return this._selectedFolderOption;
  }
  set selectedFolderOption(value: string) {
    this._selectedFolderOption = value;
    if (value) {
      this.selectedFolderYears$ = this.asyncRetrieveSelectedFolderYears(+value);
    }
    else {
      this.selectedFolderYears$ = from([]);
    }
  }

  selectedYearOption: string;

  constructor(
    private _folderService: FolderService,
    public dialogRef: MatDialogRef<FolderSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FolderSelectionData) {
  }

  ngOnInit(): void {
    this._folderService.getFolderList().subscribe(res => {
      this._originalFolders = res;
      this.folders = res;

      if (this.data.folderId) {
        this.selectedFolderOption = this.data.folderId.toString();
      }

      if (this.data.yearId) {
        this.selectedYearOption = this.data.yearId.toString();
      }
    });
  }

  asyncRetrieveSelectedFolderYears(folderId: number): Observable<FolderYear[]> {
    return from(this._originalFolders)
      .pipe(
        filter(folder => folder.folderId === folderId),
        map(f => f.years)
      );
  }

  onSelectClick(): FolderSelectionData {
    return {
      folderId: +this._selectedFolderOption,
      yearId: +this.selectedYearOption
    };
  }

  canEnableOk(): boolean {
    if (this.selectedFolderOption && this.selectedYearOption) {
      return true;
    }

    return false;
  }

  applyFolderFilter(event: Event): void {
    const filterValueLowercase = (event.target as HTMLInputElement).value.toLocaleLowerCase();
    this.folders = this._originalFolders.filter(f => f.folderName.toLocaleLowerCase().indexOf(filterValueLowercase) > -1);
  }
}
