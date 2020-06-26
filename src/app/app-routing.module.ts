import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsRoutingModule, contactRoutes } from './contacts/contacts-routing.module';

const routes: Routes = [
]
  .concat(contactRoutes);

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ContactsRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
