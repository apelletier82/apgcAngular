import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../shared/shared.module';

const modules = [
    CommonModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    RouterTestingModule,
    SharedModule
];

@NgModule({
    declarations: [],
    imports: [... modules],
    exports: [... modules]
})
export class TestingModule { }
