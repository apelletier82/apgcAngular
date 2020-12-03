/* eslint-disable no-underscore-dangle */
import { DataSource } from '@angular/cdk/table';
import { Folder } from '../folder';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { FolderService } from '../folder.service';
import { finalize, delay, catchError } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';

export class FolderListDataSource implements DataSource<Folder> {
    private foldersSubject = new BehaviorSubject<Folder[]>([]);
    private folderSubjectLoading = new BehaviorSubject<boolean>(false);
    private _sort: MatSort;

    foldersLoading$ = this.folderSubjectLoading.asObservable();
    get sort(): MatSort {
        return this._sort;
    }
    set sort(value: MatSort) {
        this._sort?.sortChange?.unsubscribe();
        this._sort = value;
        this._sort.sortChange.subscribe(() =>
            this.foldersSubject.next(
                this.sortFolders(this.foldersSubject.value)
            )
        );
    }

    constructor(private folderService: FolderService) {}

    connect(_: CollectionViewer): Observable<Folder[] | readonly Folder[]> {
        return this.foldersSubject.asObservable();
    }

    disconnect(_: CollectionViewer): void {
        this.foldersSubject.complete();
        this.folderSubjectLoading.complete();
    }

    sortFolders(folders: Folder[]): Folder[] {
        return folders.sort((a: Folder, b: Folder) => {
            if (!this._sort || this._sort?.direction === '') {
                return 0;
            }
            const desc =
                this._sort.direction.toLocaleLowerCase() === 'desc' ? -1 : 1;
            switch (this._sort.active) {
                case 'folderName':
                    if (a && b) {
                        return a.folderName.localeCompare(b.folderName) * desc;
                    }
                    break;
                case 'folderLocation':
                    if (a?.address && b?.address) {
                        return (
                            a.address.city.localeCompare(b.address.city) * desc
                        );
                    }
                    break;
                default:
                    return 0;
            }
            return 0;
        });
    }

    private updateFolderLoadingSubject(loading: boolean) {
        if (loading !== this.folderSubjectLoading.value) {
            this.folderSubjectLoading.next(loading);
        }
    }

    loadFolders(): void {
        this.updateFolderLoadingSubject(true);
        this.folderService
            .getFolderList()
            .pipe(
                catchError(() => of([])),
                delay(250),
                finalize(() => this.updateFolderLoadingSubject(false))
            )
            .subscribe((folders: Folder[]) => {
                if (this._sort) {
                    folders = this.sortFolders(folders);
                }
                this.foldersSubject.next(folders);
            });
    }
}
