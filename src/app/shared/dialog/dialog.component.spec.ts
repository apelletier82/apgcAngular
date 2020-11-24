import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TestingModule } from 'src/app/test/testing.module';
import { DialogData } from './dialog-data';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
    let component: DialogComponent;
    let fixture: ComponentFixture<DialogComponent>;

    const dialogData: DialogData = {
        title: 'Dialog title',
        description: 'Dialog description',
        actions: [{ action: 'Cancel' }, { action: 'Ok', default: true }]
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TestingModule
            ],
            declarations: [
                DialogComponent
            ],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: dialogData }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
