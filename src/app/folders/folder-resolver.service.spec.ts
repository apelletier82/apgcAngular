import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, ParamMap } from '@angular/router';
import { of } from 'rxjs';
import { TestingModule } from '../test/testing.module';
import { Folder } from './folder';

import { FolderResolverService } from './folder-resolver.service';
import { FolderService } from './folder.service';
import * as testingConstants from '../test/testing.constants';

describe('FolderResolverService', () => {
  let service: FolderResolverService;
  let folderService;
  const FOLDER_ID = 1;

  beforeEach(() => {
    folderService = jasmine.createSpyObj('folderService', ['getFolder']);
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [{ provide: FolderService, useValue: folderService }],
    });
    service = TestBed.inject(FolderResolverService);
    folderService.getFolder.and.returnValue(
      of<Folder>(testingConstants.FOLDER_1_MOCK)
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should resolve folder by route folder 1', (done) => {
    const activateRouteSnapshot = new ActivatedRouteSnapshot();
    service
      .resolve(
        {
          paramMap: {
            get: (id) => FOLDER_ID.toString(),
          } as ParamMap,
        } as ActivatedRouteSnapshot,
        null
      )
      .subscribe((folder: Folder) => {
        expect(folder).toBeTruthy();
        expect(folder.folderId).toBe(1);
        done();
      });
  });
});
