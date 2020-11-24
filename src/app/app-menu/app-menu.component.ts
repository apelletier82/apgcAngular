/* eslint-disable no-underscore-dangle */
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { AppService } from '../app.service';
import { AppMenu } from './app-menu';
import { AppMenuService } from './app-menu.service';

@Component({
    selector: 'apgc-app-menu',
    templateUrl: './app-menu.component.html',
    styleUrls: ['./app-menu.component.scss']
})
export class AppMenuComponent {
    @ViewChild(MatAccordion) accordionMenu: MatAccordion;
    @Output() menuItemClick = new EventEmitter();

    private _menu: AppMenu;
    get menu(): AppMenu {
        return this._menu;
    }

    constructor(private appMenuService: AppMenuService, public appService: AppService) {
        appMenuService.getMenu$().subscribe(result => this._menu = result);
    }

    private accordionMenuCloseAll() {
        this.accordionMenu.multi = true;
        try {
            this.accordionMenu.closeAll();
        }
        finally {
            this.accordionMenu.multi = false;
        }
    }

    homeClick() {
        this.accordionMenuCloseAll();
        this.itemClick();
    }
    itemClick() {
        this.menuItemClick.emit();
    }
}
