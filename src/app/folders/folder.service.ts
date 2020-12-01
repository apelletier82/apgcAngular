import { Injectable } from '@angular/core';
import { Folder } from './folder';
import { BehaviorSubject, Observable } from 'rxjs';
import { FolderYear } from './folder-year';
import { map, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BackendService } from '../shared/services/backend.service';

@Injectable({
    providedIn: 'root',
})
export class FolderService {
    private folderListSubject = new BehaviorSubject<Folder[]>([]);
    get folderList$(): Observable<Folder[]> {
        return this.folderListSubject.asObservable().pipe(shareReplay());
    }

    constructor(private backendService: BackendService) {}

    getFolderList(): Observable<Folder[]> {
        return this.backendService
            .get<Folder[]>(
                `${environment.apiUrl}${environment.apiFolderContext}`
            )
            .pipe(tap((folders) => this.folderListSubject.next(folders)));
    }

    getFolder(folderId: number): Observable<Folder> {
        return this.backendService.get<Folder>(
            `${environment.apiUrl}${environment.apiFolderContext}/${folderId}`
        );
    }

    getFolderYears(folderId: number): Observable<FolderYear[]> {
        return this.getFolder(folderId).pipe(map((result) => result.years));
    }

    getFolderYear(folderId: number, yearId: number): Observable<FolderYear> {
        return this.getFolderYears(folderId).pipe(
            map((years) => years.find((item) => item.yearId === yearId))
        );
    }
}
