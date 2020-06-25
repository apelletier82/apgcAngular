import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FolderSelectionComponent } from './folder-selection.component';
import { FoldersModule } from '../folders.module';
import { FolderService } from '../folder.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Folder } from '../folder';

describe('FolderSelectionComponent', () => {
  let component: FolderSelectionComponent;
  let fixture: ComponentFixture<FolderSelectionComponent>;
  let folderServiceMock;
  let mockDialogRef;

  const folderData = { folderId: undefined, yearId: undefined };
  const FOLDERS_MOCK = require('src/api/mock/folders/folders.json');

  beforeEach(async(() => {
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

  it('should init', () => {
    component.ngOnInit();
    expect(component.folders.length).toBe(2);
  });

  it('should apply folder filter', () => {
    const event = { target: { value: 'im'}};
    component.applyFolderFilter(((event as unknown) as Event));
    expect(component.folders.length).toBe(1);
    expect(component.folders[0].folderName).toBe('ImmoElec');
  });

  it('should get folder years', (done: DoneFn) => {
    const fldId = 1; // id of the single folder mock
    component.asyncRetrieveSelectedFolderYears(fldId).subscribe(res => {
      expect(res).toBeDefined();
      expect(res.length).toBe(2);
      done();
    });
  });
});
