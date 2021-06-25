/* eslint-disable no-underscore-dangle */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import AppService from '../app.service';
import AppMenu from './app-menu';
import AppMenuService from './app-menu.service';

@Component({
  selector: 'apgc-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss'],
})
export default class AppMenuComponent implements OnInit {
  @ViewChild(MatAccordion) accordionMenu: MatAccordion;

  private _menu: AppMenu;

  get menu(): AppMenu {
    return this._menu;
  }

  private setMenu(menu: AppMenu) {
    this._menu = menu;
  }

  constructor(
    private appMenuService: AppMenuService,
    public appService: AppService,
  ) {}

  ngOnInit(): void {
    this.appMenuService.getMenu$().subscribe((result) => this.setMenu(result));
  }

  private accordionMenuCloseAll() {
    this.accordionMenu.multi = true;
    try {
      this.accordionMenu.closeAll();
    } finally {
      this.accordionMenu.multi = false;
    }
  }

  homeClick() {
    this.accordionMenuCloseAll();
  }
}
