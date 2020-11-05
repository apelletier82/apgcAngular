import { DataSource } from '@angular/cdk/table';
import { Folder } from '../folder';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, forkJoin, of } from 'rxjs';
import { FolderService } from '../folder.service';
import { finalize, delay, catchError } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';

export class FolderListDataSource implements DataSource<Folder> {
    private _foldersSubject = new BehaviorSubject<Folder[]>([]);
    private _folderSubjectLoading = new BehaviorSubject<boolean>(false);
    private _sort: MatSort;

    foldersLoading$ = this._folderSubjectLoading.asObservable();
    get sort(): MatSort {
        return this._sort;
    }
    set sort(value: MatSort) {
        this._sort = value;
        this._sort.sortChange.subscribe(() => this.loadFolders());
    }

    constructor(private _folderService: FolderService) { }

    connect(collectionViewer: CollectionViewer): Observable<Folder[] | readonly Folder[]> {
        return this._foldersSubject.asObservable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this._foldersSubject.complete();
        this._folderSubjectLoading.complete();
    }

    sortFolders(folders: Folder[]): Folder[] {
        return folders.sort((a: Folder, b: Folder) => {
            if (!this._sort || this._sort?.direction === '') {
                return 0;
            }
            const desc = this._sort.direction.toLocaleLowerCase() === 'desc' ? -1 : 1;
            switch (this._sort.active) {
                case 'folderName':
                    if (a && b) {
                        return a.folderName.localeCompare(b.folderName) * desc;
                    }
                    break;
                case 'folderLocation':
                    if (a && a.address && b && b.address) {
                        return a.address.city.localeCompare(b.address.city) * desc;
                    }
                    break;
                default:
                    return 0;
            }
            return 0;
        });
    }

    loadFolders(): void {
        this._folderSubjectLoading.next(true);
        try {
            const fakeObs = of(1);

            forkJoin([
                fakeObs.pipe(delay(250)),
                this._folderService.getFolderList().pipe(catchError(() => of([])))
            ])
            .pipe(finalize(() => this._folderSubjectLoading.next(false)))
            .subscribe(([intv, flds]) => {
                if (this._sort) {
                    flds = this.sortFolders(flds);
                }
                this._foldersSubject.next(flds);
            });
        }
        catch (error) {
            this._folderSubjectLoading.next(false);
            console.log(error);
        }
    }

}
