import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { FolderService } from '../folder.service';
import { Folder } from '../folder';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FolderYear } from '../folder-year';
import { FolderSelectionData } from './folder-selection-data';
import { Observable, from, concat, of } from 'rxjs';
import { map, filter, scan, toArray, reduce } from 'rxjs/operators';

@Component({
  selector: 'apgc-folder-selection',
  templateUrl: './folder-selection.component.html',
  styleUrls: ['./folder-selection.component.scss']
})
export class FolderSelectionComponent implements OnInit {
  private _originalFolders: Folder[] = [];
  folders$: Observable<Folder[]>;

  selectedFolderYears$: Observable<FolderYear[]>;

  private _selectedFolderId: number;
  get selectedFolderId(): number {
    return this._selectedFolderId;
  }
  set selectedFolderId(value: number) {
    this._selectedFolderId = value;
    if (value) {
      this.selectedFolderYears$ = this._folderService.getFolder(+value).pipe(map(f => f.years));
    }
    else {
      this.selectedFolderYears$ = from([]);
    }
  }

  selectedYearId: number;

  constructor(
    private _folderService: FolderService,
    public dialogRef: MatDialogRef<FolderSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FolderSelectionData) {
  }

  ngOnInit(): void {
    this._folderService.getFolderList().subscribe(res => {
      this.folders$ = from(res).pipe(toArray());
      this._originalFolders = res;
    });
  }

  onSelectClick(): FolderSelectionData {
    return {
      folderId: +this._selectedFolderId,
      yearId: +this.selectedYearId
    };
  }

  canEnableOk(): boolean {
    if (this.selectedFolderId && this.selectedYearId) {
      return true;
    }

    return false;
  }

  applyFolderFilter(event: Event): void {
    const filterValueLowercase = (event.target as HTMLInputElement).value.toLocaleLowerCase();
    this.folders$ = from(this._originalFolders).pipe(
      filter<Folder>(f => f.folderName.toLocaleLowerCase().indexOf(filterValueLowercase) > -1),
      toArray()
    );
  }

  isSelectedFolderCurrentFolder(folderId: number): boolean {
    return this.data.folderId && folderId
      && folderId === this.data.folderId;
  }

  isSelectedYearCurrentFolderYear(yearId: number): boolean {
    return this.isSelectedFolderCurrentFolder(+this.selectedFolderId)
      && this.data.yearId && yearId
      && this.data.yearId === yearId;
  }
}
