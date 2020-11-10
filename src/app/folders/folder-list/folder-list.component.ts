import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Folder } from '../folder';
import { FolderService } from '../folder.service';
import { FolderListDataSource } from './folder-list-dataSource';

@Component({
  selector: 'apgc-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent implements OnInit, AfterViewInit {
  public readonly displayColumns = ['folderLogo', 'folderName', 'folderCountry', 'folderLocation', 'actions'];
  folderDataSource: FolderListDataSource;

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private folderService: FolderService) {
    this.folderDataSource = new FolderListDataSource(this.folderService);
  }

  ngOnInit(): void {
    this.folderDataSource.loadFolders();
  }

  ngAfterViewInit(): void {
    this.folderDataSource.sort = this.sort;
  }

  trackByFolderId(_: number, folder: Folder): any {
    return folder.folderId;
  }
}
