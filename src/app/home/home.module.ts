import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import HomeRoutingModule from './home-routing.module';
import HomeComponent from './home/home.component';
import AppMaterialModule from '../app-material.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AppMaterialModule,
  ],
})
export default class HomeModule {}
