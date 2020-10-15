import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FolderSelectionComponent } from './folder-selection.component';
import { FoldersModule } from '../folders.module';
import { FolderService } from '../folder.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Folder } from '../folder';
import { By } from '@angular/platform-browser';
import { MatSelectionList } from '@angular/material/list';

describe('FolderSelectionComponent', () => {
  let component: FolderSelectionComponent;
  let fixture: ComponentFixture<FolderSelectionComponent>;
  let folderServiceMock;
  let mockDialogRef;

  const folderData = { folderId: undefined, yearId: undefined };
  const FOLDERS_MOCK = require('src/api/mock/folders/folders.json');

  beforeEach(waitForAsync(() => {
    mockDialogRef = { close: jasmine.createSpy('close') };
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

    folderServiceMock.getFolderList.and.returnValue(of<Folder[]>(FOLDERS_MOCK));
    folderServiceMock.getFolder.and.returnValue(of<Folder>(FOLDERS_MOCK[0]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', (done: DoneFn) => {
    component.ngOnInit();
    component.folders$.subscribe(res => {
      expect(res.length).toBe(2);
      done();
    });
  });

  it('should apply folder filter', (done: DoneFn) => {
    const event = { target: { value: 'immo'}};
    component.applyFolderFilter(((event as unknown) as Event));
    component.folders$.subscribe(res => {
      expect(res.length).toBe(1);
      expect(res[0].folderName).toBe('ImmoElec');
      done();
    });
  });

  fit('should load years of a folder', (done) => {
    let actualTest = false;
    component.selectedFolderYears$.subscribe(res => {
      if (actualTest === true) {
        expect(res?.length).toBeGreaterThan(0);
        done();
      }
    });

    actualTest = true;
    component.selectFolderIdForm.setValue({ selectedFolderId: [1] });
  });
});
