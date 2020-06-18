import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderSelectionComponent } from './folder-selection.component';

describe('FolderSelectionComponent', () => {
  let component: FolderSelectionComponent;
  let fixture: ComponentFixture<FolderSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
