import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import BackendService from '../shared/services/backend.service';
import TestingModule from '../test/testing.module';
import AppMenuService from './app-menu.service';

describe('AppMenuService', () => {
  let service: AppMenuService;
  let backendServiceMock;

  beforeEach(() => {
    backendServiceMock = jasmine.createSpyObj(['get']);
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [{ provide: BackendService, useValue: backendServiceMock }],
    });
    service = TestBed.inject(AppMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get menus', (done) => {
    const menu = {
      home: {
        id: 1,
        caption: 'Home',
        icon: 'home',
        routerLink: 'home',
      },
      categories: [],
    };

    backendServiceMock.get.and.returnValue(of(menu));
    service.getMenu$().subscribe((result) => {
      expect(result).toBeTruthy();
      done();
    });
  });
});
