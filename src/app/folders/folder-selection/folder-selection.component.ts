import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { FolderService } from '../folder.service';
import { Folder } from '../folder';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FolderYear } from '../folder-year';
import { FolderSelectionData } from './folder-selection-data';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatVerticalStepper } from '@angular/material/stepper';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'apgc-folder-selection',
  templateUrl: './folder-selection.component.html',
  styleUrls: ['./folder-selection.component.scss']
})
export class FolderSelectionComponent implements OnInit, OnDestroy {
  private initializing = true;
  private originalFolders: Folder[] = [];
  private selectedFolderYearsSubscription: Subscription;
  private getFolderListSubscription: Subscription;
  private selectFolderIdFormValueChangeSubscription: Subscription;

  folders$: BehaviorSubject<Folder[]> = new BehaviorSubject([]);
  selectedFolderYears$: BehaviorSubject<FolderYear[]> = new BehaviorSubject([]);

  //#region selectFolderForm
  selectFolderForm = new FormGroup({
    selectFolderIdForm: new FormGroup({
      selectedFolderId: new FormControl([], [Validators.required])
    }),
    selectYearIdForm: new FormGroup({
      selectedYearId: new FormControl([], [Validators.required])
    })
  });

  get selectFolderIdForm(): FormGroup {
    return this.selectFolderForm.get('selectFolderIdForm') as FormGroup;
  }

  get selectYearIdForm(): FormGroup {
    return this.selectFolderForm.get('selectYearIdForm') as FormGroup;
  }

  get selectedFolderId(): number {
    return +this.selectFolderIdForm.get('selectedFolderId').value || 0;
  }

  get selectedYearId(): number {
    return +this.selectYearIdForm.get('selectedYearId').value || 0;
  }
  //#endregion selectFolderForm

  get selectedFolderData(): FolderSelectionData {
    return  {
      folderId: this.selectedFolderId,
      yearId: this.selectedYearId
    };
  }

  @ViewChild(MatVerticalStepper, { static: true }) stepper: MatVerticalStepper;

  constructor(private _folderService: FolderService, public dialogRef: MatDialogRef<FolderSelectionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: FolderSelectionData) { }

  ngOnDestroy(): void {
    this.getFolderListSubscription?.unsubscribe();
    this.selectFolderIdFormValueChangeSubscription?.unsubscribe();
    this.selectedFolderYearsSubscription?.unsubscribe();

    this.selectedFolderYears$.complete();
    this.folders$.complete();
  }

  ngOnInit(): void {
    this.getFolderListSubscription = this._folderService.getFolderList().subscribe(res => {
      this.folders$.next(res);
      this.originalFolders = res;
    });

    this.selectFolderIdFormValueChangeSubscription = this.selectFolderIdForm.get('selectedFolderId').valueChanges.subscribe(value => {
      this.selectYearIdForm.setValue({ selectedYearId: [] });
      if (value?.length > 0) {
        this._folderService.getFolder(+value)
          .pipe(map(f => f.years))
          .subscribe(years => this.selectedFolderYears$.next(years || []));
      }
      else {
        this.selectedFolderYears$.next([]);
      }
    });

    this.selectedFolderYearsSubscription = this.selectedFolderYears$.asObservable().subscribe(years => {
      if (years?.length > 0 && this.initializing === false) {
        this.stepper?.next();
      }
    });

    // Has to be initialized as array
    this.selectFolderForm.setValue({
      selectFolderIdForm: { selectedFolderId: this.data?.folderId ? [this.data.folderId] : [] },
      selectYearIdForm: { selectedYearId: this.data?.yearId ? [this.data.yearId] : [] }
    });

    setTimeout(_ => this.initializing = false, 250);
  }

  applyFolderFilter(event: Event): void {
    const filterValueLowercase = (event.target as HTMLInputElement).value.toLocaleLowerCase();
    this.folders$.next(
      this.originalFolders
        .filter(f => f.folderName.toLocaleLowerCase().indexOf(filterValueLowercase) > -1)
    );
  }
}
