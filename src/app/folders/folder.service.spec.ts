import { TestBed } from '@angular/core/testing';
import { FolderService } from './folder.service';
import { FOLDER_API_URL } from 'src/api/api-config';
import { HttpClientModule } from '@angular/common/http';
import { ExpectedConditions } from 'protractor';

describe('FoldersService', () => {
  let service: FolderService;  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
          HttpClientModule],
      providers:[              
        { provide: FOLDER_API_URL, useValue: '/api/mock/folders' }
      ]
    });
    
    service = TestBed.get(FolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('#getFolderList should return array of folders', 
    (done: DoneFn) => 
      service.getFolderList().subscribe(
        value => {
          expect(value.length).toBe(1);        
          done();
          }
      ));

  it('#getFolder should return a folder', 
    (done: DoneFn) => 
      service.getFolder(1).subscribe(value => {
        expect(value.folderId).toBe(1);
        done();
      }
    ));

  it('#getFolderYears sould return array of folderYears',
    (done:DoneFn) => 
      service.getFolderYears(1).subscribe(value => {
        expect(value.length).toBe(2);
        done();
      }
    ));

  it('#getFolderYear should return a folderYear',
      (done:DoneFn) =>
        service.getFolderYear(1,2).subscribe(value => {
          expect(value.year).toBe(2020);
          done();
        })
  );
});
