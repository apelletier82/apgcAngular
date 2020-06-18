import { Injectable } from '@angular/core';

@Injectable({
    providedIn:'root'
})
export class AppContext {    
    folderId: number;
    folderName: string;
    yearId: number;
    yearName: string;     
}