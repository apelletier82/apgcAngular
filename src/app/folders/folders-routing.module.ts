import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FolderListComponent } from './folder-list/folder-list.component';
import { FolderComponent } from './folder/folder.component';

export const folderRoutes: Routes = [
    { path: 'folders', component: FolderListComponent },
    { path: 'folders/:id', component: FolderComponent },
];

@NgModule({
    imports: [RouterModule.forChild(folderRoutes)],
    exports: [RouterModule],
})
export class FoldersRoutingModule {}
