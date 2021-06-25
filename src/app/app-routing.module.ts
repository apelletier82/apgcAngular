import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import {
  ContactsRoutingModule,
  contactRoutes,
} from './contacts/contacts-routing.module';
import {
  FoldersRoutingModule,
  folderRoutes,
} from './folders/folders-routing.module';
import {
  HomeRoutingModule,
  homeRoutes,
} from './home/home-routing.module';
import HomeComponent from './home/home/home.component';

const emptyRoute: Route = {
  path: '',
  component: HomeComponent,
  pathMatch: 'full',
};
const errorRoute: Route = {
  path: '***',
  component: HomeComponent,
  pathMatch: 'full',
};

export const routes: Routes = []
  .concat(homeRoutes)
  .concat(contactRoutes)
  .concat(folderRoutes)
  .concat([emptyRoute, errorRoute]);

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    HomeRoutingModule,
    ContactsRoutingModule,
    FoldersRoutingModule,
  ],
  exports: [
    RouterModule,
    HomeRoutingModule,
    ContactsRoutingModule,
    FoldersRoutingModule], // exporting RouterModule will give access to it outside from this module
})
export default class AppRoutingModule {}
