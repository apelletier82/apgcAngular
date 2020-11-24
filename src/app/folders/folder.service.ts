import { Injectable, Inject } from '@angular/core';
import { Folder } from './folder';
import { Observable } from 'rxjs';
import { FolderYear } from './folder-year';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BackendService } from '../shared/services/backend.service';

@Injectable({
    providedIn: 'root',
})
export class FolderService {
    constructor(private backendService: BackendService) {}

    getFolderList(): Observable<Folder[]> {
        return this.backendService.get<Folder[]>(`${environment.apiUrl}${environment.apiFolderContext}/list`);
    }

    getFolder(folderId: number): Observable<Folder> {
        return this.backendService.get<Folder>(`${environment.apiUrl}${environment.apiFolderContext}/${folderId}`);
    }

    getFolderYears(folderId: number): Observable<FolderYear[]> {
        return this.getFolder(folderId).pipe(map((result) => result.years));
    }

    getFolderYear(folderId: number, yearId: number): Observable<FolderYear> {
        return this.getFolderYears(folderId).pipe(map((years) => years.find((item) => item.yearId === yearId)));
    }
}
