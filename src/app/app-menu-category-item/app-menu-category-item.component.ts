import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'apgc-app-menu-category-item',
  templateUrl: './app-menu-category-item.component.html',
  styleUrls: ['./app-menu-category-item.component.scss']
})
export class AppMenuCategoryItemComponent implements OnInit {

  @Input() category: string;
  @Input() expanded = true;
  @Input() fontIcon: string;

  constructor() { }

  ngOnInit(): void {
    if (this.expanded && this.expanded === true) {
      this.expanded = true;
    }
    else {
      this.expanded = false;
    }
  }

  toggleExpand() {
    this.expanded = !this.expanded;
  }

}
