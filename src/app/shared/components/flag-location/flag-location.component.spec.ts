import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlagLocationComponent } from './flag-location.component';

describe('FlagLocationComponent', () => {
  let component: FlagLocationComponent;
  let fixture: ComponentFixture<FlagLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlagLocationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
