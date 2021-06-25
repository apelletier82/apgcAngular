import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import Folder from '../folder';

@Component({
  selector: 'apgc-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export default class FolderComponent implements OnInit, OnDestroy {
  private routeDataSubscription: Subscription;

  folder: Folder;

  private setFolderWithRouteData(folderData: Folder) {
    this.folder = folderData;
  }

  constructor(private route: ActivatedRoute) {}

  ngOnDestroy(): void {
    if (this.routeDataSubscription) {
      this.routeDataSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.routeDataSubscription = this.route.data.subscribe(
      (folderData: Folder) => this.setFolderWithRouteData(folderData),
    );
  }
}
