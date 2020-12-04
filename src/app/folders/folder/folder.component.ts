import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Folder } from '../folder';

@Component({
  selector: 'apgc-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent implements OnInit {
  folder: Folder;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((folderData: Folder) => {
      this.folder = folderData['0'];
    });
  }
}
