import { ComponentFixture, TestBed } from '@angular/core/testing';
import { emit, hasUncaughtExceptionCaptureCallback } from 'process';
import { of } from 'rxjs';
import { BackendService } from '../shared/services/backend.service';
import { TestingModule } from '../test/testing.module';

import { AppMenuComponent } from './app-menu.component';

describe('AppMenuComponent', () => {
    let component: AppMenuComponent;
    let fixture: ComponentFixture<AppMenuComponent>;
    let backendServiceMock;

    beforeEach(async () => {
        backendServiceMock = jasmine.createSpyObj(['get']);
        await TestBed.configureTestingModule({
            declarations: [AppMenuComponent],
            imports: [TestingModule],
            providers: [
                { provide: BackendService, useValue: backendServiceMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        backendServiceMock.get.and.returnValue(
            of({
                home: {
                    id: 1,
                    caption: '',
                    routerLink: 'home',
                },
                categories: [],
            })
        );

        fixture = TestBed.createComponent(AppMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
