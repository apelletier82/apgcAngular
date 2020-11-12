import { TestBed } from '@angular/core/testing';

import { AppMenuService } from './app-menu.service';

describe('AppMenuService', () => {
  let service: AppMenuService;
  let backendServiceMock;

  beforeEach(() => {
    backendServiceMock = jasmine.createSpyObj(['get']);
    TestBed.configureTestingModule({});
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
        routerLink: 'home'
      },
      categories: []
    };

    backendServiceMock.get.and.returnValue(menu);
    service.getMenu$().subscribe(result => {
      expect(result).toBeTruthy();
      done();
    });
  });
});
