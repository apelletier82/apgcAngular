import { Injectable } from '@angular/core';
import { Folder } from './folder';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  constructor(private _httpClient: HttpClient) { }

  getFolderList(): Observable<Folder[]> {
    return this._httpClient.get<Folder[]>("/api/mock/folders/folders.json");
  }

  getFolder(folderId: number): Observable<Folder> {
    return this.getFolderList().pipe(
        map(folders => folders.filter(f => f.folderId === folderId).shift())
    );
  }  
}
