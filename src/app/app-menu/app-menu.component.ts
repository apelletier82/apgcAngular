import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { _MatDialogBase } from '@angular/material/dialog';
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

  @Output() menuItemClick = new EventEmitter();

  constructor(private appMenuService: AppMenuService, public appService: AppService) {
    this.appMenuService.getMenu$().subscribe(appMenu => this._menu = appMenu);
  }

  itemClick() {
    this.menuItemClick.emit();
  }
}
