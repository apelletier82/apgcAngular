import { FolderListDatasource } from './folder-list-datasource';
import { TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs';
import { Folder } from '../folder';
import { FoldersModule } from '../folders.module';
import { FolderService } from '../folder.service';
import { hasUncaughtExceptionCaptureCallback } from 'process';

describe('FolderListDatasource', () => {
    let instance: FolderListDatasource;
    let folderServiceMock;

    const FOLDERS_MOCK = require('src/api/mock/folders/folders.json');

    beforeEach(async(() => {
        folderServiceMock = jasmine.createSpyObj('folderServiceMock', ['getFolderList']);
        TestBed.configureTestingModule({
            imports: [FoldersModule],
            providers: [
                { provide: FolderService, useValue: folderServiceMock }
            ]
        });
    }));

    beforeEach(() => {
        folderServiceMock.getFolderList.and.returnValue(of<Folder[]>(FOLDERS_MOCK));
        instance = TestBed.inject(FolderListDatasource);
    });

    it('should load folders', (done: DoneFn) => {
        instance.loadFloders();
        instance.foldersLoading$.subscribe(res => {
            expect(res).toBe(false);
            done();
        });
    });

    it('should connect', (done: DoneFn) => {
        instance.connect(null).subscribe(res => {
            expect(res).toBeDefined();
            expect(res.length).toBe(FOLDERS_MOCK.length);
        });
    });
});
