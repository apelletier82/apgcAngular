import { TestBed, TestBedStatic, TestModuleMetadata } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { FolderSelectionService } from './folder-selection.service';

class FolderDialogMock {
  open() {
    return {
      afterClosed() {
        return of({ folderId: 1, yearId: 1 });
      }
    };
  }
}

class FolderDialogCancelMock {
  open() {
    return {
      afterClosed() {
        return of(undefined);
      }
    };
  }
}

class ConfigureTestBed {
  static configureTestingModule(useCancelClass?: boolean): FolderSelectionService {
    let moduleDef: TestModuleMetadata;
    const appServiceMock = jasmine.createSpyObj(['updateAppFolderContext']);
    moduleDef = {
      providers: [
        { provide: AppService, useValue: appServiceMock }
      ]
    };

    if ((useCancelClass ?? false) === true) {
      moduleDef.providers = [...[ { provide: MatDialog, useClass: FolderDialogCancelMock } ]];
    }
    else {
      moduleDef.providers = [...[ { provide: MatDialog, useClass: FolderDialogMock } ]];
    }

    TestBed.configureTestingModule(moduleDef);

    return TestBed.inject(FolderSelectionService);
  }
}

describe('FolderSelectionService', () => {
  let service: FolderSelectionService;

  beforeEach(() => { });

  it('should be created', () => {
    service = ConfigureTestBed.configureTestingModule();
    expect(service).toBeTruthy();
  });

  it('should open folder selection dialog', (done) => {
    service = ConfigureTestBed.configureTestingModule();
    service.openFolderSelectionDialog({ folderId: 1, yearId: 1 }).subscribe(result => {
      expect(result).toBeTruthy();
      done();
    });
  });

  it('should select application folder context', (done) => {
    service = ConfigureTestBed.configureTestingModule();
    service.selectApplicationFolder({ folderId: 1, yearId: 1 }).subscribe(result => {
      expect(result).toBeTruthy();
      done();
    });
  });

  it('should cancel dialog', (done) => {
    service = ConfigureTestBed.configureTestingModule(true);
    service.openFolderSelectionDialog({ folderId: 1, yearId: 1 }).subscribe(result => {
      expect(result).toBeFalsy();
      done();
    });
  });
});
