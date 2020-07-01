import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FolderListComponent } from './folder-list/folder-list.component';

export const folderRoutes: Routes = [
  { path: 'folders', component: FolderListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(folderRoutes)],
  exports: [RouterModule]
})
export class FoldersRoutingModule { }
