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
    let matSortMock;
    const FOLDERS_MOCK = require('src/tests/mock/folders/folders.json');

    beforeEach(
        waitForAsync(() => {
            folderServiceMock = jasmine.createSpyObj('folderServiceMock', [
                'getFolderList',
                'getFolder',
            ]);
            matSortMock = jasmine.createSpyObj(
                'matSortMock',
                [],
                ['active', 'direction', 'disabled', 'start']
            );

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
        // component.sort = matSortMock;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should view init', async () => {
        component.ngAfterViewInit();

        expect(component.folderDataSource).toBeDefined();
        expect(component.folderDataSource.sort).toBeDefined();
    });

    it('should init', (done: DoneFn) => {
        component.folderDataSource.foldersLoading$.subscribe((res) => {
            expect(res).toBe(true);
            done();
        });
    });
});
