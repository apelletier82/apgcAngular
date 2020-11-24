import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { TestingModule } from 'src/app/test/testing.module';
import { NotificationConfigType } from './notification-config-type';

import { NotificationComponent } from './notification.component';

describe('SnackBarComponent', () => {
    let component: NotificationComponent;
    let fixture: ComponentFixture<NotificationComponent>;
    let snackBarRef;

    const snackBarDataValue = {
        type: NotificationConfigType.information,
        description: 'test snackbar',
        action: 'action',
        showCloseButton: true,
    };

    const snackBarRefValue = {
        dismiss: () => {},
        dismissWithAction: () => {},
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NotificationComponent],
            imports: [TestingModule],
            providers: [
                { provide: MatSnackBarRef, useValue: snackBarRefValue },
                { provide: MAT_SNACK_BAR_DATA, useValue: snackBarDataValue },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        snackBarRef = TestBed.inject(MatSnackBarRef);
        fixture = TestBed.createComponent(NotificationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should close', () => {
        spyOn(snackBarRef, 'dismiss').and.callThrough();
        component.close();

        expect(snackBarRef.dismiss).toHaveBeenCalledWith([]);
    });

    it('should close with action', () => {
        spyOn(snackBarRef, 'dismissWithAction').and.callThrough();
        component.onActionClick();

        expect(snackBarRef.dismissWithAction).toHaveBeenCalledWith([]);
    });

    it('should have information css', () => {
        expect(component.cssClass).toEqual('notification-container information');
    });
});
