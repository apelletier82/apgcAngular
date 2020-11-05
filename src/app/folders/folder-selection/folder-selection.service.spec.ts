import { TestBed } from '@angular/core/testing';
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

describe('FolderSelectionService', () => {
  let service: FolderSelectionService;
  let appServiceMock;

  beforeEach(() => {
    appServiceMock = jasmine.createSpyObj(['updateAppFolderContext']);
    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialog, useClass: FolderDialogMock },
        { provide: AppService, useValue: appServiceMock }
      ]
    });
    service = TestBed.inject(FolderSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open folder selection dialog', (done) => {
    service.openFolderSelectionDialog({ folderId: 1, yearId: 1 }).subscribe(result => {
      expect(result).toBeTruthy();
      done();
    });
  });

  it('should select application folder context', (done) => {
    service.selectApplicationFolder({ folderId: 1, yearId: 1 }).subscribe(result => {
      expect(result).toBeTruthy();
      done();
    });
  });
});
