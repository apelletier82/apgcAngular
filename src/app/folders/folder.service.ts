import { Injectable, Inject } from '@angular/core';
import { Folder } from './folder';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOLDER_API_URL } from '../../api/api-config';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  constructor(private httpClient: HttpClient) { }

  getFolderList(): Observable<Folder[]> {
    return this.httpClient.get<Folder[]>(`${FOLDER_API_URL}/folders`);
  }

  getFolder(folderId: number): Observable<Folder> {
    return this.httpClient.get<Folder>(`${FOLDER_API_URL}/${folderId}`);
  }
}
