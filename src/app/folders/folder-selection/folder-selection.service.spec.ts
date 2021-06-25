/* eslint-disable max-classes-per-file */
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import AppService from 'src/app/app.service';
import TestingModule from 'src/app/test/testing.module';
import FolderSelectionService from './folder-selection.service';

class FolderDialogMock {
  private readonly openResult = {
    afterClosed() {
      return of({ folderId: 1, yearId: 1 });
    },
  };

  open() {
    return this.openResult;
  }
}

class FolderDialogCancelMock {
  private readonly openResult = {
    afterClosed() {
      return of(undefined);
    },
  };

  open() {
    return this.openResult;
  }
}

describe('FolderSelectionService', () => {
  let service: FolderSelectionService;
  let appServiceMock: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [{ provide: MatDialog, useClass: FolderDialogMock }],
    });
    appServiceMock = TestBed.inject(AppService);
    service = TestBed.inject(FolderSelectionService);
    spyOn(appServiceMock, 'updateAppFolderContext');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open folder selection dialog', (done) => {
    service
      .openFolderSelectionDialog({ folderId: 1, yearId: 1 })
      .subscribe((result) => {
        expect(result).toBeTruthy();
        done();
      });
  });

  it('should select application folder context', (done) => {
    service
      .selectApplicationFolder({ folderId: 1, yearId: 1 })
      .subscribe((result) => {
        expect(result).toBeTruthy();
        done();
      });
  });
});

describe('FolderSelectionService cancel selection', () => {
  let service: FolderSelectionService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [{ provide: MatDialog, useClass: FolderDialogCancelMock }],
    });

    service = TestBed.inject(FolderSelectionService);
  });

  it('should cancel dialog', (done) => {
    service
      .openFolderSelectionDialog({ folderId: 1, yearId: 1 })
      .subscribe((result) => {
        expect(result).toBeFalsy();
        done();
      });
  });
});
