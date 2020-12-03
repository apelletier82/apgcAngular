import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderListComponent } from './folder-list.component';
import { FolderService } from '../folder.service';
import { Folder } from '../folder';
import { of } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { TestingModule } from 'src/app/test/testing.module';

describe('FolderListComponent', () => {
    let component: FolderListComponent;
    let fixture: ComponentFixture<FolderListComponent>;
    let folderServiceMock;
    const FOLDERS_MOCK: Folder[] = require('src/tests/mock/folders/folders.json');

    beforeEach(
        waitForAsync(() => {
            folderServiceMock = jasmine.createSpyObj('folderServiceMock', [
                'getFolderList',
                'getFolder',
            ]);

            TestBed.configureTestingModule({
                declarations: [FolderListComponent, MatSort],
                imports: [TestingModule],
                providers: [
                    { provide: FolderService, useValue: folderServiceMock },
                ],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        folderServiceMock.getFolderList.and.returnValue(
            of<Folder[]>(FOLDERS_MOCK)
        );
        fixture = TestBed.createComponent(FolderListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should init', (done: DoneFn) => {
        component.ngOnInit();
        component.folderDataSource.foldersLoading$.subscribe((res) => {
            expect(res).toBe(true);
            done();
        });
    });

    it('should return folderId on trackByFolder', () => {
        const folderId = 1;
        const folder = FOLDERS_MOCK.find(
            (searchFolder) => searchFolder.folderId === folderId
        );

        expect(component.trackByFolderId(1, folder)).toBe(folderId);
    });
});
