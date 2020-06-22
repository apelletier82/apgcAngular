import { Component, OnInit, Inject } from '@angular/core';
import { FolderService } from '../folder.service';
import { Folder } from '../folder';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FolderYear } from '../folder-year';
import { FolderSelectionData } from './folder-selection-data';

@Component({
  selector: 'apgc-folder-selection',
  templateUrl: './folder-selection.component.html',
  styleUrls: ['./folder-selection.component.scss']
})
export class FolderSelectionComponent implements OnInit {
  private originalFolders: Folder[];
  private internalSelectedFolderOption: string;

  folders: Folder[];
  selectedFolderYears: FolderYear[];

  get selectedFolderOption(): string {
    return this.internalSelectedFolderOption;
  }
  set selectedFolderOption(value: string) {
    this.internalSelectedFolderOption = value;
    if (value) {
      this.selectedFolderYears = this.getSelectedFolderYears();
    }
    else {
      this.selectedFolderYears = [];
    }
  }

  selectedYearOption: string;

  constructor(
    private folderService: FolderService,
    public dialogRef: MatDialogRef<FolderSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FolderSelectionData) {
  }

  ngOnInit(): void {
    this.folderService.getFolderList().subscribe(res => {
      this.originalFolders = res.slice();
      this.folders = res.slice();


      if (this.data.folderId) {
        this.internalSelectedFolderOption = this.data.folderId.toString();
      }

      if (this.data.yearId) {
        this.selectedYearOption = this.data.yearId.toString();
      }
    });
  }

  getSelectedFolderYears(): FolderYear[] {
    const fldId: number = +this.internalSelectedFolderOption;
    const flds = this.originalFolders.filter(f => f.folderId === fldId);
    if ((!flds) || (flds.length === 0)) {
      return [];
    }

    const res = flds.shift();
    return res.years;
  }

  onSelectClick(): FolderSelectionData {
    return {
      folderId: +this.internalSelectedFolderOption,
      yearId: +this.selectedYearOption
    };
  }

  canEnableOk(): boolean {
    if (this.internalSelectedFolderOption && this.selectedYearOption) {
      return true;
    }

    return false;
  }

  applyFolderFilter(event: Event): void {
    const filterValueLowerCase = (event.target as HTMLInputElement).value.toLocaleLowerCase();
    this.folders = this.originalFolders.filter(
      f => f.folderName.toLocaleLowerCase().indexOf(filterValueLowerCase) > -1);
  }
}
