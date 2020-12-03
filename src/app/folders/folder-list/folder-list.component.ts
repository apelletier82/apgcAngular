import {
    Component,
    OnInit,
    ViewChild,
    AfterViewInit,
    OnDestroy,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Folder } from '../folder';
import { FolderService } from '../folder.service';
import { FolderListDataSource } from './folder-list-dataSource';

@Component({
    selector: 'apgc-folder-list',
    templateUrl: './folder-list.component.html',
    styleUrls: ['./folder-list.component.scss'],
})
export class FolderListComponent implements OnInit, OnDestroy, AfterViewInit {
    private folderLoadingSubscription: Subscription;

    public readonly displayColumns = [
        'folderName',
        'folderLocation',
        'actions',
    ];
    folderDataSource: FolderListDataSource;

    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private folderService: FolderService,
        private appService: AppService
    ) {
        this.folderDataSource = new FolderListDataSource(this.folderService);
    }

    private subscribeToFolderLoading() {
        setTimeout(() => {
            this.folderLoadingSubscription = this.folderDataSource.foldersLoading$.subscribe(
                (loading: boolean) => {
                    if (loading) {
                        this.appService.beginLoading();
                    } else {
                        this.appService.endLoading();
                    }
                }
            );
        }, 1);
    }

    ngOnDestroy(): void {
        this.folderLoadingSubscription?.unsubscribe();
    }

    ngOnInit(): void {
        this.subscribeToFolderLoading();
        this.folderDataSource.loadFolders();
    }

    ngAfterViewInit(): void {
        this.folderDataSource.sort = this.sort;
    }

    trackByFolderId(_: number, folder: Folder): any {
        return folder.folderId;
    }
}
