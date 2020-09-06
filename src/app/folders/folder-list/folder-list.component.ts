import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FolderService } from '../folder.service';
import { FolderListDatasource } from './folder-list-datasource';

@Component({
  selector: 'apgc-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent implements OnInit, AfterViewInit {
  displayColumns = ['folderLogo', 'folderName', 'folderCountry', 'folderLocation', 'actions'];
  folderDataSource: FolderListDatasource;

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private _folderService: FolderService) { }

  ngOnInit(): void {
    this.folderDataSource = new FolderListDatasource(this._folderService);
    this.folderDataSource.loadFloders();
  }

  ngAfterViewInit(): void {
    this.folderDataSource.sort = this.sort;
  }

}
