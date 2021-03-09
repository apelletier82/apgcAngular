import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Folder } from '../folder';

@Component({
  selector: 'apgc-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent implements OnInit, OnDestroy {
  private routeDataSubscription: Subscription;
  folder: Folder;

  constructor(private route: ActivatedRoute) {}

  ngOnDestroy(): void {
    this.routeDataSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.routeDataSubscription = this.route.data.subscribe(
      (folderData: Folder) => (this.folder = folderData['0'])
    );
  }
}
