import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { AppContext } from 'src/app/app-context';
import { FolderService } from '../folder.service';
import { Folder } from '../folder';
import { MatDialogRef } from '@angular/material/dialog';
import { FolderYear } from '../folder-year';

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
    if (value && value != '') {
      this.selectedFolderYears = this.getSelectedFolderYears()
    }
    else {
      this.selectedFolderYears = [];
    } 
  }

  selectedYearOption: string;

  constructor(public appContext: AppContext,
    private _folderService: FolderService,
    public dialogRef: MatDialogRef<FolderSelectionComponent>) {
  }

  ngOnInit(): void {  
    this._folderService.getFolderList().subscribe(res => {
      this._originalFolders = res.slice();
      this.folders = res.slice();

      if (this.appContext.folderId) {  
        this.selectedFolderOption = this.appContext.folderId.toString();
      }
      if (this.appContext.yearId) {
        this.selectedYearOption = this.appContext.yearId.toString();
      }      
    });
  }

  getSelectedFolderYears(): FolderYear[] {
    const fldId = +this.selectedFolderOption;
    const flds = this._originalFolders.filter(f => f.folderId === fldId);
    if ((!flds) || (flds.length === 0))
      return [];

    const res = flds.shift();
    return res.years;
  }
  

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.appContext.folderId = +this.selectedFolderOption;
    this.appContext.yearId = +this.selectedYearOption;
    
    this.dialogRef.close()    
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
