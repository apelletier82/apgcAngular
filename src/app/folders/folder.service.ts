import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import environment from 'src/environments/environment';
import FolderYear from './folder-year';
import Folder from './folder';
import BackendService from '../shared/services/backend.service';

@Injectable({
  providedIn: 'root',
})
export default class FolderService {
  private folderListSubject = new BehaviorSubject<Folder[]>([]);

  get folderList$(): Observable<Folder[]> {
    return this.folderListSubject.asObservable().pipe(shareReplay());
  }

  constructor(private backendService: BackendService) {}

  getFolderList(): Observable<Folder[]> {
    return this.backendService
      .get<Folder[]>(`${environment.apiUrl}${environment.apiFolderContext}`)
      .pipe(tap((folders) => this.folderListSubject.next(folders)));
  }

  getFolder(folderId: number): Observable<Folder> {
    return this.backendService.get<Folder>(
      `${environment.apiUrl}${environment.apiFolderContext}${folderId}`,
    );
  }

  getFolderYears(folderId: number): Observable<FolderYear[]> {
    return this.backendService.get<FolderYear[]>(
      `${environment.apiUrl}${environment.apiFolderYearContext}${folderId}`,
    );
  }

  getFolderYear(yearId: number): Observable<FolderYear> {
    return this.backendService.get<FolderYear>(
      `${environment.apiUrl}${environment.apiYearContext}${yearId}`,
    );
  }
}
