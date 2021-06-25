import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import Folder from './folder';
import FolderService from './folder.service';

@Injectable({
  providedIn: 'root',
})
export default class FolderResolverService implements Resolve<Folder> {
  constructor(private folderService: FolderService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot,
  ): Observable<Folder> {
    return this.folderService.getFolder(+route?.paramMap?.get('id'));
  }
}
