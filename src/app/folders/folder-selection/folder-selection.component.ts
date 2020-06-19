import { Component, OnInit, Inject } from '@angular/core';
import { FolderService } from '../folder.service';
import { Folder } from '../folder';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FolderYear } from '../folder-year';
import { FolderSelectionData } from './folder-selection-data';
import { Data } from '@angular/router';

@Component({
  selector: 'apgc-folder-selection',
  templateUrl: './folder-selection.component.html',
  styleUrls: ['./folder-selection.component.scss']
})
export class FolderSelectionComponent implements OnInit {
  private _originalFolders: Folder[];
  private _selectedFolderOption: string;

  folders: Folder[];
  selectedFolderYears: FolderYear[];

  get selectedFolderOption(): string {
    return this._selectedFolderOption;
  }
  set selectedFolderOption(value: string){
    this._selectedFolderOption = value;
    if (value) {
      this.selectedFolderYears = this.getSelectedFolderYears()
    }
    else {
      this.selectedFolderYears = [];
    } 
  };

  selectedYearOption: string;

  constructor(private _folderService: FolderService,
    public dialogRef: MatDialogRef<FolderSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FolderSelectionData) {
  }

  ngOnInit(): void {    
    if (this.data.folderId){
      this._selectedFolderOption = this.data.folderId.toString();
    };

    if (this.data.yearId) {
      this.selectedYearOption = this.data.yearId.toString();
    }

    this._folderService.getFolderList().subscribe(res => {
      this._originalFolders = res.slice();
      this.folders = res.slice();   
    });
  }

  getSelectedFolderYears(): FolderYear[] { 
    const fldId: number = +this._selectedFolderOption; 
    const flds = this._originalFolders.filter(f => f.folderId === fldId);
    if ((!flds) || (flds.length === 0))
      return [];

    const res = flds.shift();
    return res.years;
  }
  
  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSelectClick(): FolderSelectionData {
    return {
      folderId: +this.selectedFolderOption,
      yearId: +this.selectedYearOption
    };      
  }

  canEnableOk(): boolean {
    if (this.selectedFolderOption && this.selectedYearOption)
      return true;

    return false;
  }

  applyFolderFilter(event: Event): void{
    const filterValueLowerCase = (event.target as HTMLInputElement).value.toLocaleLowerCase();
    this.folders = this._originalFolders.filter(
        f => f.folderName.toLocaleLowerCase().indexOf(filterValueLowerCase) > -1);
  }
}
