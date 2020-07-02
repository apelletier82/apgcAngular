import { FolderListDatasource } from './folder-list-datasource';
import { TestBed, async } from '@angular/core/testing';
import { of, BehaviorSubject } from 'rxjs';
import { Folder } from '../folder';
import { FoldersModule } from '../folders.module';
import { FolderService } from '../folder.service';

describe('FolderListDatasource', () => {
    let instance: FolderListDatasource;
    let folderServiceMock;

    const FOLDERS_MOCK = require('src/api/mock/folders/folders.json');

    beforeEach(() => {
        folderServiceMock = jasmine.createSpyObj('folderServiceMock', ['getFolderList']);
        folderServiceMock.getFolderList.and.returnValue(of<Folder[]>(FOLDERS_MOCK));
        instance = new FolderListDatasource(folderServiceMock);        
    });

    it('should load folders', (done: DoneFn) => {
        instance.loadFloders();
        instance.foldersLoading$.subscribe(res => {
            //expect(res).toBe(true);
            done();
        });
    });

    it('should connect', (done: DoneFn) => {
        instance.connect(null).subscribe(res => {
            expect(res).toBeDefined();
            expect(res.length).toBe(0);
            done();
        });
    });

    it('should disconnect', (done: DoneFn) => {        
        instance.foldersLoading$.subscribe(res => {
            expect(res).toBe(false);
            done();
        });
        instance.disconnect(null);
    });
});
