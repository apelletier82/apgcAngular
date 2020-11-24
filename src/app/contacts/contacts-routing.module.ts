import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
import { Routes } from '@angular/router';

export const contactRoutes: Routes = [{ path: 'contacts', component: ContactListComponent, data: { displayName: 'Contacts' } }];

@NgModule({
    declarations: [],
    imports: [CommonModule],
})
export class ContactsRoutingModule {}
