import { FolderListDataSource } from './folder-list-dataSource';
import { of } from 'rxjs';
import { Folder } from '../folder';

describe('FolderListDataSource', () => {
  let instance: FolderListDataSource;
  let folderServiceMock: any;

  const FOLDERS_MOCK = require('src/tests/mock/folders/folders.json');

  beforeEach(() => {
    folderServiceMock = jasmine.createSpyObj('folderServiceMock', [
      'getFolderList',
    ]);
    folderServiceMock.getFolderList.and.returnValue(of<Folder[]>(FOLDERS_MOCK));
    instance = new FolderListDataSource(folderServiceMock);
  });

  it('should load folders', (done: DoneFn) => {
    let actualTest = false;
    instance.foldersLoading$.subscribe((res) => {
      if (actualTest === true) {
        actualTest = false;

        expect(res).toBe(true);
        done();
      }
    });
    actualTest = true;
    instance.loadFolders();
  });

  it('should connect', (done: DoneFn) => {
    instance.connect(null).subscribe((res) => {
      expect(res).toBeDefined();
      expect(res.length).toBe(0);
      done();
    });
  });

  it('should disconnect', (done: DoneFn) => {
    instance.foldersLoading$.subscribe((res) => {
      expect(res).toBe(false);
      done();
    });
    instance.disconnect(null);
  });
});
