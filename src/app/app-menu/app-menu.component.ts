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
  private _menu: AppMenu;
  public get menu(): AppMenu {
    return this._menu;
  }

  @ViewChild(MatAccordion) accordionMenu: MatAccordion;
  @Output() menuItemClick = new EventEmitter();

  constructor(private appMenuService: AppMenuService, public appService: AppService) {
    this.appMenuService.getMenu$().subscribe(appMenu => this._menu = appMenu);
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
