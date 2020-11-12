import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { FolderSelection } from './folder-selection';
import { FolderSelectionComponent } from './folder-selection.component';

@Injectable({
  providedIn: 'root'
})
export class FolderSelectionService {

  constructor(public dialog: MatDialog, private appService: AppService) { }

  openFolderSelectionDialog(folderSelection: FolderSelection): Observable<FolderSelection> {
    const dialogRef = this.dialog.open(FolderSelectionComponent, {
      data: { folderId: folderSelection?.folderId, yearId: folderSelection?.yearId }
    });

    return dialogRef.afterClosed().pipe(map(res => res ? res as FolderSelection : undefined));
  }

  selectApplicationFolder(folderSelection?: FolderSelection): Observable<FolderSelection> {
    return this.openFolderSelectionDialog(folderSelection ?? { folderId: this.appService.folderId, yearId: this.appService.yearId })
      .pipe(
        tap(result => {
          if (result) {
            this.appService.updateAppFolderContext(result.folderId, result.yearId);
          }
        })
      );
  }
}
