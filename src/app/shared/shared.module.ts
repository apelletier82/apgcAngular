import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/app-material.module';
import { FoldersModule } from 'src/app/folders/folders.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from './dialog/dialog.module';
import { NotificationModule } from './notification/notification.module';
import { MenuIconCaptionComponent } from './components/menu-icon-caption/menu-icon-caption.component';
import { FlagLocationComponent } from './components/flag-location/flag-location.component';
import { CountryFlagComponent } from './components/country-flag/country-flag.component';
import { AddressDisplayComponent } from './components/address-display/address-display.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { LabelFieldDisplayComponent } from './components/label-field-display/label-field-display.component';
import { SectionSeparatorComponent } from './components/section-separator/section-separator.component';

const components = [
  MenuIconCaptionComponent,
  FlagLocationComponent,
  CountryFlagComponent,
  AddressDisplayComponent,
  LabelFieldDisplayComponent,
  SectionSeparatorComponent
];

const modules = [
  CommonModule,
  HttpClientModule,
  AppMaterialModule,
  AppRoutingModule,
  DialogModule,
  NotificationModule,
];

@NgModule({
  declarations: [...components, AddressDisplayComponent, LabelFieldDisplayComponent, SectionSeparatorComponent],
  imports: [
    ...modules,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  exports: [...components],
})
export class SharedModule {}
