import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import BackendService from '../shared/services/backend.service';
import { Folder } from './folder';
import FolderService from './folder.service';

const FOLDERS_MOCK: Folder[] = require('src/tests/mock/folders/folders.json');

describe('FoldersService', () => {
  let service: FolderService;
  let backendServiceMock: any;

  beforeEach(() => {
    backendServiceMock = jasmine.createSpyObj('backendService', ['get']);
    TestBed.configureTestingModule({
      imports: [],
      providers: [{ provide: BackendService, useValue: backendServiceMock }],
    });

    service = TestBed.inject(FolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get folder list and store it', (done) => {
    const folders$ = of<Folder[]>(FOLDERS_MOCK);
    backendServiceMock.get.and.returnValue(folders$);
    service.getFolderList().subscribe((folders) => {
      expect(folders).toBeTruthy('Folders mock is not empty');
      expect(folders.length).toBeGreaterThan(
        0,
        'Folders mock contains at least 2 folders',
      );
      service.folderList$.subscribe((storedFolders) => {
        expect(storedFolders).toBeTruthy();
        expect(storedFolders.length).toBe(folders.length);

        done();
      });
    });
  });
});
