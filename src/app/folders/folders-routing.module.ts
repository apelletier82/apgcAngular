import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { FolderListComponent } from './folder-list/folder-list.component';
import { FolderComponent } from './folder/folder.component';

export const folderRoutes: Routes = [
  {
    path: 'folders',
    component: FolderListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'folders/:id',
    component: FolderComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(folderRoutes)],
  exports: [RouterModule],
})
export class FoldersRoutingModule {}
