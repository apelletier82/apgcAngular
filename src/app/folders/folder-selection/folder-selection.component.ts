import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { FolderService } from '../folder.service';
import { Folder } from '../folder';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FolderYear } from '../folder-year';
import { FolderSelection } from './folder-selection';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatVerticalStepper } from '@angular/material/stepper';

@Component({
    selector: 'apgc-folder-selection',
    templateUrl: './folder-selection.component.html',
    styleUrls: ['./folder-selection.component.scss'],
})
export class FolderSelectionComponent implements OnInit, OnDestroy {
    private initializing = true;
    private originalFolders: Folder[] = [];
    private selectedFolderYearsSubscription: Subscription;
    private getFolderListSubscription: Subscription;
    private selectFolderIdFormValueChangeSubscription: Subscription;

    foldersSubject: BehaviorSubject<Folder[]> = new BehaviorSubject([]);
    selectedFolderYearsSubject: BehaviorSubject<
        FolderYear[]
    > = new BehaviorSubject([]);

    // #region selectFolderForm
    selectFolderForm = new FormGroup({
        selectFolderIdForm: new FormGroup({
            selectedFolderId: new FormControl([], [Validators.required]),
        }),
        selectYearIdForm: new FormGroup({
            selectedYearId: new FormControl([], [Validators.required]),
        }),
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
    // #endregion selectFolderForm

    get selectedFolderData(): FolderSelection {
        return {
            folderId: this.selectedFolderId,
            yearId: this.selectedYearId,
        };
    }

    @ViewChild(MatVerticalStepper, { static: true })
    stepper: MatVerticalStepper;

    constructor(
        private folderService: FolderService, // public dialogRef: MatDialogRef<FolderSelectionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: FolderSelection
    ) {}

    ngOnDestroy(): void {
        this.getFolderListSubscription?.unsubscribe();
        this.selectFolderIdFormValueChangeSubscription?.unsubscribe();
        this.selectedFolderYearsSubscription?.unsubscribe();

        this.selectedFolderYearsSubject.complete();
        this.foldersSubject.complete();
    }

    ngOnInit(): void {
        this.getFolderListSubscription = this.folderService
            .getFolderList()
            .subscribe((res) => {
                this.foldersSubject.next(res);
                this.originalFolders = res;
            });

        this.selectFolderIdFormValueChangeSubscription = this.selectFolderIdForm
            .get('selectedFolderId')
            .valueChanges.subscribe((value) => {
                this.selectYearIdForm.setValue({ selectedYearId: [] });
                if (value?.length > 0 && +value !== 0) {
                    this.folderService
                        .getFolderYears(+value)
                        .subscribe((years) =>
                            this.selectedFolderYearsSubject.next(years || [])
                        );
                } else {
                    this.selectedFolderYearsSubject.next([]);
                }
            });

        this.selectedFolderYearsSubscription = this.selectedFolderYearsSubject
            .asObservable()
            .subscribe((years) => {
                if (years?.length > 0 && this.initializing === false) {
                    this.stepper?.next();
                }
            });

        // Has to be initialized as array
        this.selectFolderForm.setValue({
            selectFolderIdForm: {
                selectedFolderId: this.data?.folderId
                    ? [this.data.folderId]
                    : [],
            },
            selectYearIdForm: {
                selectedYearId: this.data?.yearId ? [this.data.yearId] : [],
            },
        });

        setTimeout((_) => (this.initializing = false), 250);
    }

    applyFolderFilter(event: Event): void {
        const filterValueLowercase = (event.target as HTMLInputElement).value.toLocaleLowerCase();
        this.foldersSubject.next(
            this.originalFolders.filter(
                (f) =>
                    f.folderName
                        .toLocaleLowerCase()
                        .indexOf(filterValueLowercase) > -1
            )
        );
    }
}
