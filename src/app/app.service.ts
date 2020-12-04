import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as localStorageConstant from './shared/constants/localStorage.constant';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private folderIdSubject = new BehaviorSubject<number>(
    +localStorage?.getItem(
      localStorageConstant.storageAppContextFolderIdKeyName
    ) ?? 0
  );
  private yearIdSubject = new BehaviorSubject<number>(
    +localStorage?.getItem(
      localStorageConstant.storageAppContextYearIdKeyName
    ) ?? 0
  );

  private loadingSubject = new BehaviorSubject<number>(0);

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

  public get loading$(): Observable<boolean> {
    return this.loadingSubject
      .asObservable()
      .pipe(map((value) => (value ?? 0) > 0));
  }

  constructor() {}

  updateAppFolderContext(folderId: number, yearId: number) {
    this.folderIdSubject.next(folderId);
    this.yearIdSubject.next(yearId);

    localStorage.setItem(
      localStorageConstant.storageAppContextFolderIdKeyName,
      folderId.toString()
    );
    localStorage.setItem(
      localStorageConstant.storageAppContextYearIdKeyName,
      yearId.toString()
    );
  }

  beginLoading() {
    let loading =
      (this.loadingSubject.value ?? 0) < 0 ? 0 : this.loadingSubject.value;
    loading++;
    this.loadingSubject.next(loading);
  }

  endLoading() {
    let loading = this.loadingSubject.value;
    if (loading <= 0) {
      return;
    }
    loading--;
    this.loadingSubject.next(loading);
  }
}
