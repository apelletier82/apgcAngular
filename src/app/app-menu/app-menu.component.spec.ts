import { ComponentFixture, TestBed } from '@angular/core/testing';
import { hasUncaughtExceptionCaptureCallback } from 'process';

import { AppMenuComponent } from './app-menu.component';

describe('AppMenuComponent', () => {
  let component: AppMenuComponent;
  let fixture: ComponentFixture<AppMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should click on item', (done) => {
    component.menuItemClick.subscribe(() => {
      expect(true).toBeTruthy();
      done();
    });
    component.itemClick();
    expect(component.menuItemClick.emit).toHaveBeenCalled();
  });
});
