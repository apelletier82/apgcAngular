import { TestBed } from '@angular/core/testing';
import { FolderService } from './folder.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FOLDER_API_URL } from 'src/api/api-config';

describe('FoldersService', () => {
  let service: FolderService;
  let testController: HttpTestingController;

  const FOLDERS_MOCK = require('src/api/mock/folders/folders.json');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule]
    });

    testController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(FolderService);
  });

  afterEach(() => testController.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('#getFolderList should return array of folders', (done: DoneFn) => {
    service.getFolderList().subscribe(
      value => {
        expect(value).toBeDefined();
        expect(value.length).toBe(FOLDERS_MOCK.length);
        expect(value[0].folderId).toEqual(1);
      });
    const req = testController.expectOne(`${FOLDER_API_URL}/folders`);
    req.flush(FOLDERS_MOCK);
    done();
  });

  it('#getFolder should return a folder', (done: DoneFn) => {
    service.getFolder(1).subscribe(
      value => expect(value).toBeDefined() && expect(value.folderId).toEqual(1));
    const req = testController.expectOne(`${FOLDER_API_URL}/1`);
    req.flush(FOLDERS_MOCK);
    done();
  });
});
