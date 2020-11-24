import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BackendService } from '../shared/services/backend.service';
import { Folder } from './folder';
import { FolderService } from './folder.service';

describe('FoldersService', () => {
    let service: FolderService;
    let backendServiceMock: any;

    const FOLDER_MOCK: Folder = require('src/api/mock/folders/_1.json');

    beforeEach(() => {
        backendServiceMock = jasmine.createSpyObj('backendServiceMock', ['get']);
        TestBed.configureTestingModule({
            imports: [],
            providers: [{ provide: BackendService, useValue: backendServiceMock }],
        });

        service = TestBed.inject(FolderService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get one folderYear', (done) => {
        const folder$ = of<Folder>(FOLDER_MOCK);
        backendServiceMock.get.and.returnValue(folder$);
        service.getFolderYear(1, 1).subscribe((value) => {
            expect(value).toBeTruthy();
            expect(value.yearId).toBe(1);
            done();
        });
    });
});
