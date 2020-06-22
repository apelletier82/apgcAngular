import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppToolbarComponent } from './app-toolbar.component';
import { FoldersModule } from '../folders/folders.module';

describe('AppToolbarComponent', () => {
  let component: AppToolbarComponent;
  let fixture: ComponentFixture<AppToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppToolbarComponent],
      imports: [FoldersModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
