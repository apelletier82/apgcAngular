import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FolderSelectionComponent } from './folder-selection.component';
import { FoldersModule } from '../folders.module';
import { FolderYear } from '../folder-year';
import { FolderService } from '../folder.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FolderSelectionData } from './folder-selection-data';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FolderSelectionComponent', () => {
  let component: FolderSelectionComponent;
  let fixture: ComponentFixture<FolderSelectionComponent>;
  let folderServiceMock;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  const folderData = { folderId: undefined, yearId: undefined };

  const FOLDERS_MOCK = require('src/api/mock/folders/folders.json');
  const FOLDER_MOCK = require('src/api/mock/folders/1.json');

  beforeEach(async(() => {
    folderServiceMock = jasmine.createSpyObj('folderServiceMock', ['getFolderList', 'getFolder']);
    TestBed.configureTestingModule({
      declarations: [FolderSelectionComponent],
      imports: [FoldersModule, BrowserAnimationsModule],
      providers: [
        { provide: FolderService, useValue: folderServiceMock },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: folderData }
      ]
    })
      .compileComponents(); 
  }));

  beforeEach(() => {    
    fixture = TestBed.createComponent(FolderSelectionComponent);
    component = fixture.componentInstance;

    folderData.folderId = undefined;
    folderData.yearId = undefined;
    folderServiceMock.getFolderList.and.returnValue(of(FOLDERS_MOCK));
    folderServiceMock.getFolder.and.returnValue(of(FOLDER_MOCK));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply folder filter', () => {
    const event = { target: { value: 'im'}};
    component.applyFolderFilter(((event as unknown) as Event));

    expect(component.folders.length).toBe(1);
  });

  it('should get folder years', () => {
    const fldId = 1; // id of the single folder mock
    const res: FolderYear[] = component.getSelectedFolderYears(fldId);
    expect(res).toBeDefined();
    expect(res.length).toBe(2);
  });

});
