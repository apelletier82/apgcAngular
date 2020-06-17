import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMenuCategoryItemComponent } from './app-menu-category-item.component';

describe('AppMenuCategoryItemComponent', () => {
  let component: AppMenuCategoryItemComponent;
  let fixture: ComponentFixture<AppMenuCategoryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppMenuCategoryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMenuCategoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
