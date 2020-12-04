import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuIconCaptionComponent } from './menu-icon-caption.component';

describe('MenuIconCaptionComponent', () => {
  let component: MenuIconCaptionComponent;
  let fixture: ComponentFixture<MenuIconCaptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuIconCaptionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuIconCaptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
