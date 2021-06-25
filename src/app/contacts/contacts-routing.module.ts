import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import ContactListComponent from './contact-list/contact-list.component';

export const contactRoutes: Routes = [
  {
    path: 'contacts',
    component: ContactListComponent,
    data: { displayName: 'Contacts' },
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class ContactsRoutingModule {}
