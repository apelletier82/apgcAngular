import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private httpClient: HttpClient) { }

  public get<T>(apiUrl: string): Observable<T> {
    return this.httpClient.get<T>(apiUrl).pipe(
      catchError(error => {
        console.log(error);
        return of(null);
      })
    );
  }

  public put<T>(apiUrl: string, model: T): Observable<T> {
    return this.httpClient.put<T>(apiUrl, model).pipe(
      catchError(error => {
        console.log(error);
        return of(null);
      })
    );
  }

  public post<T>(apiUrl: string, model: T): Observable<T> {
    return this.httpClient.post<T>(apiUrl, model).pipe(
      catchError(error => {
        console.log(error);
        return of(null);
      })
    );
  }

  public delete(apiUrl: string, options?: any): Observable<ArrayBuffer> {
    return this.httpClient.delete(apiUrl, options).pipe(
      catchError(error => {
        console.log(error);
        return of(null);
      })
    );
  }
}
