import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogData } from './dialog-data';
import { DialogComponent } from './dialog.component';

@Injectable({
    providedIn: 'root',
})
export class DialogService {
    constructor(private matDialog: MatDialog) {}

    showDialog(dialogData: DialogData): Observable<any> {
        return this.matDialog.open(DialogComponent, { data: dialogData }).afterClosed();
    }
}
