import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { NotificationConfigType } from 'src/app/shared/models/notification-config-type';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { FolderService } from '../folder.service';
import { FolderListDataSource } from './folder-list-dataSource';

@Component({
  selector: 'apgc-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent implements OnInit, AfterViewInit {
  displayColumns = ['folderLogo', 'folderName', 'folderCountry', 'folderLocation', 'actions'];
  folderDataSource: FolderListDataSource;

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private _folderService: FolderService, private snackBarService: NotificationService) { }

  ngOnInit(): void {
    this.folderDataSource = new FolderListDataSource(this._folderService);
    this.folderDataSource.loadFolders();
  }

  ngAfterViewInit(): void {
    this.folderDataSource.sort = this.sort;
  }

}
