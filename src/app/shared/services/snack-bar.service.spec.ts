import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TestingModule } from 'src/app/test/testing.module';
import { SnackBarConfigType } from '../models/snack-bar-config-type';

import { SnackBarService } from './snack-bar.service';

describe('SnackBarService', () => {
  let service: SnackBarService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule
      ]
    });
    snackBar = TestBed.inject(MatSnackBar);
    service = TestBed.inject(SnackBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show information', () => {
    expect(service.showInformation('Test message', 'action').instance).toBeTruthy();
  });

  it('should show success', () => {
    expect(service.showSuccess('Test success', 'action').instance).toBeTruthy();
    expect(service.showSuccess('Test success').instance).toBeTruthy();
  });

  it('should show warning', () => {
    expect(service.showWarning('Test warning').instance).toBeTruthy();
  });

  it('should show error', () => {
    expect(service.showError('Test error').instance).toBeTruthy();
  });

  it('should show component with close button', () => {
    expect(service.showApgcSnackBar(
      {
        message: 'APGC Message',
        action: 'Action',
        showCloseButton: true
      }).instance).toBeTruthy();
  });

  it('should show information component with close button', () => {
    expect(service.showApgcSnackBar(
      {
        type: SnackBarConfigType.information,
        message: 'APGC Information',
        action: 'Ok',
        showCloseButton: true
      }).instance).toBeTruthy();
  });

  it('should show success component with close button', () => {
    expect(service.showApgcSnackBar(
      {
        type: SnackBarConfigType.success,
        message: 'APGC Successful test',
        action: 'Ok',
        showCloseButton: true
      }).instance).toBeTruthy();
  });

  it('should show warning component with close button', () => {
    expect(service.showApgcSnackBar(
      {
        type: SnackBarConfigType.warning,
        message: 'APGC Warning test',
        action: 'Ok',
        showCloseButton: true
      }).instance).toBeTruthy();
  });

  it('should show error component with close button', () => {
    expect(service.showApgcSnackBar(
      {
        type: SnackBarConfigType.error,
        message: 'APGC Error test',
        action: 'Ok',
        showCloseButton: true
      }).instance).toBeTruthy();
  });
});
