import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { TestingModule } from 'src/app/test/testing.module';
import { NotificationConfigType } from '../../models/notification-config-type';

import { SnackBarComponent } from './snack-bar.component';

describe('SnackBarComponent', () => {
  let component: SnackBarComponent;
  let fixture: ComponentFixture<SnackBarComponent>;
  let snackBarRef;

  const snackBarDataValue = {
    type: NotificationConfigType.information,
    description: 'test snackbar',
    action: 'action',
    showCloseButton: true
  };

  const snackBarRefValue = {
    dismiss: () => { },
    dismissWithAction: () => { }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SnackBarComponent
      ],
      imports: [
        TestingModule
      ],
      providers: [
        { provide: MatSnackBarRef, useValue: snackBarRefValue },
        { provide: MAT_SNACK_BAR_DATA, useValue: snackBarDataValue }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    snackBarRef = TestBed.inject(MatSnackBarRef);
    fixture = TestBed.createComponent(SnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close', () => {
    spyOn(snackBarRef, 'dismiss').and.callThrough();
    component.close();
    expect(snackBarRef.dismiss).toHaveBeenCalled();
  });

  it('should close with action', () => {
    spyOn(snackBarRef, 'dismissWithAction').and.callThrough();
    component.onActionClick();
    expect(snackBarRef.dismissWithAction).toHaveBeenCalled();
  });

  it('should have information css', () => {
    expect(component.cssClass).toEqual('snack-bar-container information');
  });
});
