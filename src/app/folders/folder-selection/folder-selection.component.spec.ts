import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderSelectionComponent } from './folder-selection.component';
import { FoldersModule } from '../folders.module';
import { FolderYear } from '../folder-year';

describe('FolderSelectionComponent', () => {  
  let component: FolderSelectionComponent;
  let fixture: ComponentFixture<FolderSelectionComponent>;
  let folderServiceMock;
  const FOLDERS_MOCK = require('src/api/mock/folders/folders.json');
  const FOLDER_MOCK = require('src/api/folders/1.json');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderSelectionComponent ],
      imports:[FoldersModule]      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    folderServiceMock = jasmine.createSpyObj('folderServiceMock', 'getFolders', 'getFolder');    
    TestBed.inject(folderServiceMock);
    fixture = TestBed.createComponent(FolderSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply folder filter', () => {
    const event = new Event('input');
    (event.target as HTMLInputElement).value = 'im';
    
    component.applyFolderFilter(event);

    expect(component.folders.length).toBe(1);    
  });

  it('should get folder years', () => {
    const fldId = 1; // id of the single folder mock
    const res: FolderYear[] = component.getSelectedFolderYears(fldId);
    expect(res).toBeDefined();
    expect(res.length).toBe(2);
  });

});
