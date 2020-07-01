import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsRoutingModule, contactRoutes } from './contacts/contacts-routing.module';
import { FoldersRoutingModule, folderRoutes } from './folders/folders-routing.module';

const routes: Routes = [
]
  .concat(contactRoutes)
  .concat(folderRoutes);

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ContactsRoutingModule,
    FoldersRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
