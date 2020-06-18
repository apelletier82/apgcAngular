import { Injectable, Inject } from '@angular/core';
import { Folder } from './folder';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { FolderYear } from './folder-year';
import { FOLDER_API_URL } from '../../api/api-config'; 

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  constructor(private _httpClient: HttpClient,
      @Inject(FOLDER_API_URL) private _apiUrl) { }

  getFolderList(): Observable<Folder[]> {
    return this._httpClient.get<Folder[]>(`${this._apiUrl}/folders`);
  }

  getFolder(folderId: number): Observable<Folder> {
    return this._httpClient.get<Folder>(`${this._apiUrl}/${folderId}`);        
  }  

  getFolderYears(folderId: number): Observable<FolderYear[]> {
    return this.getFolder(folderId).pipe(map(f => f.years));
  }

  getFolderYear(folderId: number, yearId: number): Observable<FolderYear> {
    return this.getFolderYears(folderId).pipe(
      map(years => years.filter(y => y.yearId === yearId).shift())
      );
  }
}
