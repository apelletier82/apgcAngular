import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import AppMaterialModule from '../app-material.module';
import SharedModule from '../shared/shared.module';
import { routes } from '../app-routing.module';

const modules = [
  CommonModule,
  AppMaterialModule,
  BrowserAnimationsModule,
  SharedModule,
];

const importModules = [...modules, RouterTestingModule.withRoutes(routes)];
const exportModules = modules;

@NgModule({
  declarations: [],
  imports: [...importModules],
  exports: [...exportModules],
})
export default class TestingModule {}
