import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { FolderService } from '../folder.service';
import { Folder } from '../folder';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FolderYear } from '../folder-year';
import { FolderSelectionData } from './folder-selection-data';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'apgc-folder-selection',
  templateUrl: './folder-selection.component.html',
  styleUrls: ['./folder-selection.component.scss']
})
export class FolderSelectionComponent implements OnInit {
  private _originalFolders: Folder[] = [];
  private selectedFolderId: number;
  private selectedYearId: number;

  folders$: BehaviorSubject<Folder[]> = new BehaviorSubject([]);
  selectedFolderYears$: BehaviorSubject<FolderYear[]> = new BehaviorSubject([]);

  selectFolderForm = new FormGroup({
    selectedFolderId: new FormControl(0, [Validators.required, Validators.min(1)]),
    selectedYearId: new FormControl(0, [Validators.required, Validators.min(1)])
  });

  constructor(
    private _folderService: FolderService,
    public dialogRef: MatDialogRef<FolderSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FolderSelectionData) {

    this.selectFolderForm.reset({ selectedFolderId: data.folderId, selectedYearId: data.yearId });
    this.selectFolderForm.markAsPristine();
  }

  ngOnInit(): void {
    this._folderService.getFolderList().subscribe(res => {
      this.folders$.next(res);
      this._originalFolders = res;
    });

    this.selectFolderForm.get('selectedFolderId').valueChanges.subscribe(value => {
      if (value) {
        this._folderService.getFolder(+value)
          .pipe(map(f => f.years))
          .subscribe(years => this.selectedFolderYears$.next(years));
      }
      else {
        this.selectedFolderYears$.next([]);
      }
    });

    this.selectFolderForm.valueChanges.subscribe(value => {
      this.selectedFolderId = value.selectedFolderId;
      this.selectedYearId = value.selectedYearId;
    });
  }

  onSelectClick(): FolderSelectionData {
    return {
      folderId: +this.selectedFolderId,
      yearId: +this.selectedYearId
    };
  }

  applyFolderFilter(event: Event): void {
    const filterValueLowercase = (event.target as HTMLInputElement).value.toLocaleLowerCase();
    this.folders$.next(
      this._originalFolders
        .filter(f => f.folderName.toLocaleLowerCase().indexOf(filterValueLowercase) > -1)
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
