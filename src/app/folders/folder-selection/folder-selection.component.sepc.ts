import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderSelectionComponent } from './folder-selection.component';
import { FoldersModule } from '../folders.module';

describe('FolderSelectionComponent', () => {  
  let component: FolderSelectionComponent;
  let fixture: ComponentFixture<FolderSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderSelectionComponent ],
      imports:[FoldersModule]
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
