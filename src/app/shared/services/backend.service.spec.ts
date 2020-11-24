import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Folder } from 'src/app/folders/folder';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../notification/notification.service';

import { BackendService } from './backend.service';

describe('BackendService', () => {
    let service: BackendService;
    let testController: HttpTestingController;
    let notificationServiceMock;

    const FOLDER_MOCK = require('src/api/mock/folders/_1.json');
    const FOLDER_API = `${environment.apiUrl}${environment.apiFolderContext}`;

    beforeEach(() => {
        notificationServiceMock = jasmine.createSpyObj(['showException']);

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                { provide: NotificationService, useValue: notificationServiceMock }
            ]
        });

        testController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(BackendService);
    });

    afterEach(() => testController.verify());

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get an array of folders', (done: DoneFn) => {
        const FOLDERS_MOCK = require('src/api/mock/folders/folders.json');
        service.get<Folder[]>(`${FOLDER_API}/list`).subscribe(
            value => {
                expect(value).toBeDefined();
                expect(value.length).toBe(FOLDERS_MOCK.length);
                done();
            });
        const req = testController.expectOne(`${FOLDER_API}/list`);
        req.flush(FOLDERS_MOCK);
    });

    it('should get one folder', (done: DoneFn) => {
        service.get<Folder>(`${FOLDER_API}/1`).subscribe(
            value => {
                expect(value).toBeDefined();
                done();
            });
        const req = testController.expectOne(`${FOLDER_API}/1`);
        req.flush(FOLDER_MOCK);
    });

    it('should post one folder', (done) => {
        const folder: Folder = {... FOLDER_MOCK};
        folder.folderId = 3;
        service.post<Folder>(`${FOLDER_API}`, folder).subscribe(value => {
            expect(value).toBeTruthy();
            expect(value.folderId).toBe(3);
            done();
        });
        const req = testController.expectOne(`${FOLDER_API}`);
        req.flush(folder);
    });

    it('should put one folder', (done) => {
        const folder: Folder = { ...FOLDER_MOCK };
        folder.folderName = 'Test edit folder name';
        service.put<Folder>(`${FOLDER_API}`, folder).subscribe(value => {
            expect(value).toBeTruthy();
            expect(value.folderName).toBe('Test edit folder name');
            done();
        });
        const req = testController.expectOne(`${FOLDER_API}`);
        req.flush(folder);
    });

    it('should delete one folder', (done) => {
        service.delete(`${FOLDER_API}/1`).subscribe(result => {
            expect(result).toBeTruthy();
            done();
        });
        const req = testController.expectOne({ method: 'DELETE', url: `${FOLDER_API}/1` });
        req.flush([true]);
    });
});
