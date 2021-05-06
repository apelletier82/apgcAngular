import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelFieldDisplayComponent } from './label-field-display.component';

describe('LabelFieldDisplayComponent', () => {
  let component: LabelFieldDisplayComponent;
  let fixture: ComponentFixture<LabelFieldDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelFieldDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelFieldDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
