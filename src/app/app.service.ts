import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import * as localStorageConstant from './shared/constants/localStorage.constant';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private folderIdSubject = new BehaviorSubject<number>(+localStorage?.getItem(localStorageConstant.storageAppContextFolderIdKeyName) ?? 0);
  private yearIdSubject = new BehaviorSubject<number>(+localStorage?.getItem(localStorageConstant.storageAppContextYearIdKeyName) ?? 0);

  public get folderId$(): Observable<number> {
    return this.folderIdSubject.asObservable();
  }

  public get folderId(): number {
    return this.folderIdSubject.value;
  }

  public get yearId$(): Observable<number> {
    return this.yearIdSubject.asObservable();
  }

  public get yearId(): number {
    return this.yearIdSubject.value;
  }

  constructor() { }

  updateAppFolderContext(folderId: number, yearId: number) {
    this.folderIdSubject.next(folderId);
    this.yearIdSubject.next(yearId);

    localStorage.setItem(localStorageConstant.storageAppContextFolderIdKeyName, folderId.toString());
    localStorage.setItem(localStorageConstant.storageAppContextYearIdKeyName, yearId.toString());
  }
}
