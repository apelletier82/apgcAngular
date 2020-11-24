/* eslint-disable no-underscore-dangle */
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FolderService } from '../folders/folder.service';
import { FolderSelectionService } from 'src/app/folders/folder-selection/folder-selection.service';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Folder } from 'src/app/folders/folder';
import { FolderYear } from 'src/app/folders/folder-year';

@Component({
    selector: 'apgc-app-toolbar',
    templateUrl: './app-toolbar.component.html',
    styleUrls: ['./app-toolbar.component.scss']
})
export class AppToolbarComponent implements OnInit, OnDestroy {
    private _folderId: number;
    private _folderName: string;
    private _folderLogo: string;
    private _yearId: number;
    private _yearName: string;

    private folderSubscription: Subscription;
    private yearSubscription: Subscription;

    @Input() title: string;
    @Output() menuClicked: EventEmitter<any> = new EventEmitter();

    public get folderId(): number {
        return this._folderId;
    }
    public get folderName(): string {
        return this._folderName;
    }
    public get folderLogo(): string {
        return this._folderLogo;
    }
    public get yearId(): number {
        return this._yearId;
    }
    public get yearName(): string {
        return this._yearName;
    }

    constructor(
        private folderService: FolderService,
        private folderSelectionService: FolderSelectionService,
        private appService: AppService) {
    }

    private updateFolderInformation(folder: Folder) {
        this._folderId = folder.folderId;
        this._folderLogo = folder.logo;
        this._folderName = folder.folderName;
    }

    private updateYearInformation(year: FolderYear) {
        this._yearId = year.yearId;
        this._yearName = year.year.toString();
    }

    ngOnDestroy(): void {
        this.folderSubscription?.unsubscribe();
        this.yearSubscription?.unsubscribe();
    }

    ngOnInit(): void {
        this.folderSubscription = this.appService.folderId$.subscribe(folderId => {
            if (folderId || 0 !== 0) {
                this.folderService.getFolder(folderId).subscribe(folder =>
                    this.updateFolderInformation(folder));
            }
        });

        this.yearSubscription = this.appService.yearId$.subscribe(yearId => {
            if (this.appService.folderId || 0 !== 0 && yearId || 0 !== 0) {
                this.folderService.getFolderYear(this.appService.folderId, yearId).subscribe(year =>
                    this.updateYearInformation(year));
            }
        });
    }

    menuClick() {
        this.menuClicked.emit();
    }

    onOpenFolderClick() {
        this.folderSelectionService.selectApplicationFolder().subscribe();
    }
}
