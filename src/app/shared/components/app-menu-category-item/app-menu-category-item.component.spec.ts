import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppMaterialModule } from 'src/app/app-material.module';
import { TestingModule } from 'src/app/test/testing.module';

import { AppMenuCategoryItemComponent } from './app-menu-category-item.component';

describe('AppMenuCategoryItemComponent', () => {
  let component: AppMenuCategoryItemComponent;
  let fixture: ComponentFixture<AppMenuCategoryItemComponent>;
  const initialExpandedValue = true;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppMenuCategoryItemComponent],
      imports: [
        TestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMenuCategoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.expanded = initialExpandedValue;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    component.ngOnInit();
    expect(component.expanded).toBe(initialExpandedValue);
  });

  it('should toggle expand', () => {
    const compExpanded = component.expanded;
    component.toggleExpand();
    if (compExpanded === true) {
      expect(component.expanded).toBeFalse();
    }
    else {
      expect(component.expanded).toBeTrue();
    }
  });
});
