import {
  waitForAsync,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { ActivatedRoute, Data } from '@angular/router';
import { TestingModule } from 'src/app/test/testing.module';

import { FolderComponent } from './folder.component';
import * as testingConstants from '../../test/testing.constants';
import { of } from 'rxjs';
import { Folder } from '../folder';

describe('FolderComponent', () => {
  let activatedRoute;
  let component: FolderComponent;
  let fixture: ComponentFixture<FolderComponent>;

  beforeEach(
    waitForAsync(() => {
      activatedRoute = jasmine.createSpyObj(
        'activatedRoute',
        {},
        { data: of<Data>({ '0': testingConstants.FOLDER_1_MOCK }) }
      );
      TestBed.configureTestingModule({
        declarations: [FolderComponent],
        imports: [TestingModule],
        providers: [{ provide: ActivatedRoute, useValue: activatedRoute }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have folder on init', fakeAsync(() => {
    tick(50);

    expect(component.folder).toBeTruthy();
    expect(component.folder.folderId).toBe(1);
  }));
});
