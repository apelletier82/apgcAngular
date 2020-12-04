import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Folder } from './folder';
import { FolderService } from './folder.service';

@Injectable({
  providedIn: 'root',
})
export class FolderResolverService implements Resolve<Folder> {
  constructor(private folderService: FolderService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Folder> {
    return this.folderService.getFolder(+route?.paramMap?.get('id'));
  }
}
